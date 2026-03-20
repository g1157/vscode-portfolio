import type { Article } from '@/data/articles';

const BLOG_BASE_URL = 'https://blog.117911.xyz';
const BLOG_ATOM_URL = `${BLOG_BASE_URL}/atom.xml`;
const MAX_DESCRIPTION_LENGTH = 110;
const ARTICLE_META_IMAGE_SELECTORS = [
  'property="og:image"',
  'property="og:image:url"',
  'name="twitter:image"',
  'itemprop="image"',
] as const;

const decodeXmlEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();

const stripHtml = (value: string) =>
  decodeXmlEntities(value)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const truncateText = (value: string, maxLength = MAX_DESCRIPTION_LENGTH) =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength).trim()}…`;

const extractTagContent = (value: string, tagName: string) => {
  const cdataMatch = value.match(
    new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`)
  );

  if (cdataMatch?.[1]) {
    return cdataMatch[1].trim();
  }

  const plainMatch = value.match(
    new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`)
  );

  return plainMatch?.[1]?.trim() ?? '';
};

const resolveBlogUrl = (value: string) => {
  if (!value) {
    return '';
  }

  try {
    return new URL(value, BLOG_BASE_URL).toString();
  } catch {
    return value;
  }
};

const extractDescription = (content: string) => {
  const paragraphMatches = [...content.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);

  if (paragraphMatches.length > 0) {
    return truncateText(paragraphMatches[0]);
  }

  return truncateText(stripHtml(content));
};

const extractCover = (content: string) => {
  const imageMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  return imageMatch?.[1] ? resolveBlogUrl(decodeXmlEntities(imageMatch[1])) : '';
};

const extractMetaContent = (html: string, selector: string) => {
  const directMatch = html.match(
    new RegExp(
      `<meta[^>]+${selector}[^>]+content=(?:"([^"]+)"|'([^']+)')`,
      'i'
    )
  );

  if (directMatch?.[1] || directMatch?.[2]) {
    return decodeXmlEntities(directMatch[1] ?? directMatch[2]);
  }

  const reverseMatch = html.match(
    new RegExp(
      `<meta[^>]+content=(?:"([^"]+)"|'([^']+)')[^>]+${selector}`,
      'i'
    )
  );

  return reverseMatch?.[1] || reverseMatch?.[2]
    ? decodeXmlEntities(reverseMatch[1] ?? reverseMatch[2])
    : '';
};

const extractArticleMetaCover = (html: string) => {
  for (const selector of ARTICLE_META_IMAGE_SELECTORS) {
    const value = extractMetaContent(html, selector);

    if (value) {
      return resolveBlogUrl(value);
    }
  }

  return '';
};

const formatDate = (publishedAt: string) => {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) {
    return publishedAt.slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
};

const parseAtomFeed = async (xml: string, limit: number): Promise<Article[]> => {
  const entryMatches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  return Promise.all(
    entryMatches.slice(0, limit).map(async (match, index) => {
      const entry = match[1];
      const content = extractTagContent(entry, 'content');
      const title = decodeXmlEntities(extractTagContent(entry, 'title'));
      const id =
        decodeXmlEntities(extractTagContent(entry, 'id')) ||
        `${title}-${index + 1}`;
      const publishedAt = decodeXmlEntities(extractTagContent(entry, 'published'));
      const tags = [...entry.matchAll(/<category[^>]*term="([^"]+)"/g)]
        .map((categoryMatch) => decodeXmlEntities(categoryMatch[1]))
        .filter(Boolean);
      const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
      const url = linkMatch?.[1] ? resolveBlogUrl(linkMatch[1]) : BLOG_BASE_URL;
      const feedCover = extractCover(content);

      let cover = feedCover;

      try {
        const articleResponse = await fetch(url, {
          headers: {
            Accept: 'text/html,application/xhtml+xml',
          },
        });

        if (articleResponse.ok) {
          const articleHtml = await articleResponse.text();
          cover = extractArticleMetaCover(articleHtml) || feedCover;
        }
      } catch {
        cover = feedCover;
      }

      return {
        id,
        title,
        description: extractDescription(content),
        url,
        date: formatDate(publishedAt),
        tags,
        ...(cover ? { cover } : {}),
      };
    })
  );
};

export const fetchLatestBlogArticles = async (
  limit = 6
): Promise<Article[]> => {
  const response = await fetch(BLOG_ATOM_URL, {
    headers: {
      Accept: 'application/atom+xml, application/xml, text/xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Atom feed: ${response.status}`);
  }

  const xml = await response.text();

  if (!xml.includes('<feed') || !xml.includes('<entry>')) {
    throw new Error('Atom feed did not contain valid entries');
  }

  return parseAtomFeed(xml, limit);
};
