export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: 'Blog',
    description:
      'record the moment - 以失去的心态去拥有',
    logo: '/logos/markdown_icon.svg',
    link: 'https://blog.117911.xyz',
    slug: 'blog',
  },
  {
    title: 'Sink',
    description:
      '化繁为简 - 将无意义长连接用短链接形式分享并分析点击',
    logo: '/logos/react_icon.svg',
    link: 'https://sink.117911.xyz',
    slug: 'sink',
  },
  {
    title: 'Alle',
    description:
      'Email Management - 域名邮箱管理平台',
    logo: '/logos/html_icon.svg',
    link: 'https://email.117911.xyz',
    slug: 'alle',
  },
  {
    title: 'Gemini Balance',
    description:
      'Gemini API 代理服务',
    logo: '/logos/js_icon.svg',
    link: 'http://44.244.114.59:8000',
    slug: 'gemini-balance',
  },
  {
    title: 'LibreTV',
    description:
      'Online watch films and Anime - 在线观影平台',
    logo: '/logos/html_icon.svg',
    link: 'https://libretv-cx1.pages.dev/',
    slug: 'libretv',
  },
  {
    title: 'CLI Proxy API',
    description:
      'API Proxy Service - API代理服务',
    logo: '/logos/json_icon.svg',
    link: 'https://api.117911.xyz',
    slug: 'cli-proxy-api',
  },
];
