import Image from 'next/image';
import { articles } from '@/data/articles';
import styles from '@/styles/ArticlesPage.module.css';

const ArticlesPage = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>My Articles</h1>
      <p className={styles.pageSubtitle}>
        来自{' '}
        <a
          href="https://blog.117911.xyz"
          target="_blank"
          rel="noopener"
          className={styles.underline}
        >
          我的博客
        </a>{' '}
        的文章分享 - 记录生活、影评、动漫与思考
      </p>
      <div className={styles.container}>
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener"
            className={styles.articleCard}
          >
            {article.cover && (
              <div className={styles.articleCover}>
                <Image
                  src={article.cover}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            )}
            <div className={styles.articleContent}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description}</p>
              <div className={styles.articleMeta}>
                <span className={styles.articleDate}>{article.date}</span>
                <div className={styles.articleTags}>
                  {article.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Articles' },
  };
}

export default ArticlesPage;
