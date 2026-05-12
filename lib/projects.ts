import { defaultAutomationRule, projectAutomationRules } from '@/data/projectAutomation';
import { createGitHubHeaders } from '@/lib/github';
import type { Project } from '@/types';

const GITHUB_USERNAME = 'g1157';
const MAX_AUTOMATED_PROJECTS = 40;
const GITHUB_API_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`;

interface GitHubRepoPayload {
  full_name?: string;
  name?: string;
  description?: string | null;
  html_url?: string;
  homepage?: string | null;
  fork?: boolean;
  archived?: boolean;
  private?: boolean;
  language?: string | null;
  pushed_at?: string | null;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';

const isWebProjectLink = (value?: string | null) => {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const isGitHubHost = hostname === 'github.com' || hostname.endsWith('.github.com');

    return ['http:', 'https:'].includes(url.protocol) && !isGitHubHost;
  } catch {
    return false;
  }
};

const findRule = (repo: GitHubRepoPayload) => {
  const fullName = repo.full_name ?? '';
  const name = repo.name ?? '';

  return projectAutomationRules.find((rule) => {
    if (rule.repo.toLowerCase() === fullName.toLowerCase()) {
      return true;
    }

    return rule.match?.some((keyword) =>
      `${fullName} ${name} ${repo.description ?? ''}`
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  });
};

const getProjectLink = (repo: GitHubRepoPayload) => {
  const rule = findRule(repo);

  if (isWebProjectLink(rule?.link)) {
    return rule?.link ?? '#';
  }

  if (isWebProjectLink(repo.homepage)) {
    return repo.homepage ?? '#';
  }

  return '';
};

const isDisplayableRepo = (repo: GitHubRepoPayload) => {
  if (!repo.full_name || !repo.name) {
    return false;
  }

  if (repo.fork || repo.archived || repo.private) {
    return false;
  }

  const rule = findRule(repo);
  if (rule?.include === false) {
    return false;
  }

  return !!getProjectLink(repo);
};

const repoToProject = (repo: GitHubRepoPayload): Project => {
  const rule = findRule(repo);
  const title = rule?.title ?? repo.name ?? 'GitHub Project';
  const link = getProjectLink(repo);
  const description =
    rule?.description ||
    repo.description ||
    [repo.language, repo.pushed_at ? `updated ${repo.pushed_at.slice(0, 10)}` : '']
      .filter(Boolean)
      .join(' · ') ||
    'Web project';

  return {
    title,
    description,
    logo: rule?.logo ?? defaultAutomationRule.logo,
    link,
    slug: slugify(rule?.title ?? repo.name ?? title),
    category: rule?.category ?? defaultAutomationRule.category,
  };
};

export const fetchAutomatedProjects = async (): Promise<Project[]> => {
  const response = await fetch(GITHUB_API_REPOS_URL, {
    headers: createGitHubHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub projects: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    throw new Error('GitHub projects response was not an array');
  }

  const projects = payload
    .filter((repo): repo is GitHubRepoPayload =>
      !!repo && typeof repo === 'object' && isDisplayableRepo(repo as GitHubRepoPayload)
    )
    .map((repo) => repoToProject(repo))
    .slice(0, MAX_AUTOMATED_PROJECTS);

  const seen = new Set<string>();
  return projects.filter((project) => {
    if (seen.has(project.slug)) {
      return false;
    }
    seen.add(project.slug);
    return true;
  });
};

const normalizeValue = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '')
    .replace(/[^a-z0-9./_-]+/g, '-');

const projectKeys = (project: Project) => [
  normalizeValue(project.slug),
  normalizeValue(project.title),
  normalizeValue(project.link),
];

export const mergeProjects = (
  curatedProjects: Project[],
  automatedProjects: Project[]
) => {
  const seen = new Set<string>();
  const merged: Project[] = [];

  [...curatedProjects, ...automatedProjects].forEach((project) => {
    if (!isWebProjectLink(project.link)) {
      return;
    }

    const keys = projectKeys(project);
    if (keys.some((key) => seen.has(key))) {
      return;
    }

    keys.forEach((key) => seen.add(key));
    merged.push(project);
  });

  return merged;
};
