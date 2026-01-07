import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'leleo.top',
    href: 'https://leleo.top',
  },
  {
    social: 'email',
    link: 'g1157143860@gmail.com',
    href: 'mailto:g1157143860@gmail.com',
  },
  {
    social: 'github',
    link: 'g1157',
    href: 'https://github.com/g1157',
  },
  {
    social: 'youtube',
    link: 'Blue_noblue',
    href: 'https://www.youtube.com',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
