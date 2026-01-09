import Image from 'next/image';
import { VscLinkExternal } from 'react-icons/vsc';

import styles from '@/styles/AmpcodePage.module.css';

const AmpcodePage = () => {
  const profileUrl = 'https://ampcode.com/@bluenoblue';
  const ogImageUrl = 'https://ampcode.com/@bluenoblue?og-image';

  return (
    <div className={styles.layout}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>Ampcode</h1>
        <p className={styles.pageSubtitle}>
          My AI-assisted coding profile on Ampcode
        </p>
      </div>

      <div className={styles.ampcodePage}>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileCard}
        >
          <Image
            src={ogImageUrl}
            alt="bluenoblue's Ampcode Profile"
            width={1200}
            height={630}
            className={styles.ogImage}
            unoptimized
          />
        </a>

        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>1,350</span>
            <span className={styles.statLabel}>msgs</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>38</span>
            <span className={styles.statLabel}>threads</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>259</span>
            <span className={styles.statLabel}>XP</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>+16,310</span>
            <span className={styles.statLabel}>Added</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>-1,965</span>
            <span className={styles.statLabel}>Removed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>~1,100</span>
            <span className={styles.statLabel}>Changed</span>
          </div>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
        >
          <VscLinkExternal />
          View Full Profile on Ampcode
        </a>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Ampcode' },
  };
}

export default AmpcodePage;
