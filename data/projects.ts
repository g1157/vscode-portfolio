import type { Project, ProjectCategory } from '@/types';

export const projectCategoryOrder: ProjectCategory[] = [
  'ai-services',
  'bots-collaboration',
  'developer-tools',
  'infrastructure',
  'content-media',
];

export const projectCategoryMeta: Record<
  ProjectCategory,
  { label: string; description: string }
> = {
  'ai-services': {
    label: 'AI 服务',
    description: '模型网关、对话入口与 AI 工作台',
  },
  'bots-collaboration': {
    label: '机器人与协作',
    description: 'Bot、团队协作与自动化入口',
  },
  'developer-tools': {
    label: '开发工具',
    description: '开发环境、代理工具与效率服务',
  },
  infrastructure: {
    label: '基础设施',
    description: '部署面板、文件服务与运维入口',
  },
  'content-media': {
    label: '内容与媒体',
    description: '博客、内容站点与媒体服务',
  },
};

export const projects: Project[] = [
  {
    title: 'NewAPI',
    description: '统一模型 API 网关入口',
    logo: '/logos/json_icon.svg',
    link: 'https://newapi.117911.xyz/',
    slug: 'newapi',
    category: 'ai-services',
  },
  {
    title: 'CLI Proxy API',
    description: 'API 代理服务入口',
    logo: '/logos/json_icon.svg',
    link: 'https://api.117911.xyz',
    slug: 'cli-proxy-api',
    category: 'ai-services',
  },
  {
    title: 'SillyTavern',
    description: '对话前端入口（需登录）',
    logo: '/logos/react_icon.svg',
    link: 'https://sillytavern.117911.xyz/',
    slug: 'sillytavern',
    category: 'ai-services',
  },
  {
    title: 'Cloudflare Temp Email',
    description: '域名邮箱管理入口',
    logo: '/logos/html_icon.svg',
    link: 'https://email.117911.xyz/',
    slug: 'cloudflare-temp-email',
    category: 'infrastructure',
  },
  {
    title: 'WebDAV',
    description: 'WebDAV 文件服务入口',
    logo: '/logos/html_icon.svg',
    link: 'https://webdav.117911.xyz/',
    slug: 'webdav',
    category: 'infrastructure',
  },
  {
    title: 'Sink',
    description: '短链接与点击分析',
    logo: '/logos/react_icon.svg',
    link: 'https://sink.117911.xyz',
    slug: 'sink',
    category: 'content-media',
  },
  {
    title: 'Portfolio',
    description: 'VS Code 风格个人主页',
    logo: '/logos/vscode_icon.svg',
    link: 'https://117911.xyz',
    slug: 'portfolio',
    category: 'content-media',
  },
  {
    title: 'Blog',
    description: 'record the moment - 以失去的心态去拥有',
    logo: '/logos/markdown_icon.svg',
    link: 'https://blog.117911.xyz',
    slug: 'blog',
    category: 'content-media',
  },
  {
    title: 'LibreTV',
    description: '在线影视与动漫站点',
    logo: '/logos/html_icon.svg',
    link: 'https://libretv-cx1.pages.dev/',
    slug: 'libretv',
    category: 'content-media',
  },
];
