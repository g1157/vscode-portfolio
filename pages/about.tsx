import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Blue_noblue</h1>
        <div className={styles.subtitle}>Student & Enthusiast</div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              Hey! 欢迎来到我的个人主页！我是一名热爱技术的学生和爱好者。
            </p>
            <p className={styles.paragraph}>
              终身成长 — 这是我的人生信条。
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>关于我</h2>
            <p className={styles.paragraph}>
              我相信 <span className={styles.highlight}>Lifelong Growth</span> — 
              每一次学习和尝试都是成长的一部分。
            </p>
            <p className={styles.paragraph}>
              保持好奇心，勇于尝试，持续成长。
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>技能与特质</h2>
            <p className={styles.paragraph}>
              <span className={styles.highlight}>Energy</span> - 保持稳定的投入与热情
            </p>
            <p className={styles.paragraph}>
              <span className={styles.highlight}>Curiosity</span> - 持续探索新领域与新工具
            </p>
            <p className={styles.paragraph}>
              <span className={styles.highlight}>Courage</span> - 敢于尝试高不确定性的方向
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>座右铭</h2>
            <p className={styles.paragraph}>
              GO GO GO! 🚀
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
