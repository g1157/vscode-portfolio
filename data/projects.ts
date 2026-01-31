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
    title: 'temp_email',
    description:
      'Email Management - 域名邮箱管理平台',
    logo: '/logos/html_icon.svg',
    link: 'https://email.117911.xyz/',
    slug: 'temp-email',
  },
  {
    title: 'CLI Proxy API',
    description:
      'API Proxy Service - API代理服务',
    logo: '/logos/json_icon.svg',
    link: 'https://api.117911.xyz',
    slug: 'cli-proxy-api',
  },
  {
    title: 'clawbot',
    description: 'Clawbot Project',
    logo: '/logos/json_icon.svg',
    link: 'https://clawdbot.117911.xyz/',
    slug: 'clawbot',
  },
  {
    title: '1panel_tx',
    description: '1Panel Tencent Cloud Instance',
    logo: '/logos/html_icon.svg',
    link: 'https://tengxun1panel.117911.xyz',
    slug: '1panel-tx',
  },
  {
    title: '1panel_azure',
    description: '1Panel Azure Instance',
    logo: '/logos/html_icon.svg',
    link: 'https://azure1panel.117911.xyz/',
    slug: '1panel-azure',
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
];
