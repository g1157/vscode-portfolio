import Head from 'next/head';

interface CustomHeadProps {
  title: string;
}

const CustomHead = ({ title }: CustomHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Blue_noblue is a developer and explorer building amazing web applications"
      />
      <meta
        name="keywords"
        content="Blue_noblue, developer, explorer, web developer portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Blue_noblue's Portfolio" />
      <meta
        property="og:description"
        content="A developer and explorer building amazing web applications."
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://leleo.top" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Blue_noblue',
};
