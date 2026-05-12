import type { ProjectCategory } from '@/types';

export interface ProjectAutomationRule {
  repo: string;
  match?: string[];
  include?: boolean;
  title?: string;
  description?: string;
  category?: ProjectCategory;
  logo?: string;
  link?: string;
}

export const projectAutomationRules: ProjectAutomationRule[] = [
  {
    repo: 'g1157/Obsidian',
    include: false,
  },
  {
    repo: 'g1157/g1157',
    include: false,
  },
  {
    repo: 'g1157/testmcp',
    include: false,
  },
  {
    repo: 'g1157/spider2',
    include: false,
  },
  {
    repo: 'g1157/Rust_learning',
    include: false,
  },
  {
    repo: 'g1157/grok2api',
    include: false,
  },
  {
    repo: 'g1157/gemini-business2api',
    include: false,
  },
  {
    repo: 'g1157/shiyu',
    include: false,
  },
  {
    repo: 'g1157/anyrouter-check-in',
    include: false,
  },
  {
    repo: 'g1157/dayhub-demo',
    include: false,
  },
  {
    repo: 'g1157/pot-app-collection-plugin-maimemo',
    include: false,
  },
  {
    repo: 'g1157/nl2sql-demo',
    include: false,
  },
  {
    repo: 'g1157/duckmail',
    include: false,
  },
  {
    repo: 'g1157/Hexo',
    title: 'Blog',
    description: 'record the moment - 以失去的心态去拥有',
    category: 'content-media',
    logo: '/logos/markdown_icon.svg',
    link: 'https://blog.117911.xyz',
  },
  {
    repo: 'g1157/vscode-portfolio',
    title: 'Portfolio',
    description: 'VS Code 风格个人主页',
    category: 'content-media',
    logo: '/logos/vscode_icon.svg',
    link: 'https://117911.xyz',
  },
  {
    repo: 'g1157/CLIProxyAPI',
    title: 'CLI Proxy API',
    description: 'OpenAI/Gemini/Claude/Codex 兼容 API 网关',
    category: 'ai-services',
    logo: '/logos/json_icon.svg',
    link: 'https://api.117911.xyz',
  },
  {
    repo: 'g1157/cloudflare_temp_email',
    title: 'Cloudflare Temp Email',
    description: 'Cloudflare 临时域名邮箱服务',
    category: 'infrastructure',
    logo: '/logos/html_icon.svg',
    link: 'https://email.117911.xyz/',
  },
  {
    repo: 'g1157/Sink',
    title: 'Sink',
    description: '短链接与点击分析',
    category: 'content-media',
    logo: '/logos/react_icon.svg',
    link: 'https://sink.117911.xyz',
  },
];

export const defaultAutomationRule: Required<
  Pick<ProjectAutomationRule, 'category' | 'logo'>
> = {
  category: 'developer-tools',
  logo: '/logos/json_icon.svg',
};
