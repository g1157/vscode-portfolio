import { defaultAutomationRule, projectAutomationRules } from '@/data/projectAutomation';
import type { Project } from '@/types';

const GITHUB_USERNAME = 'g1157';
const MAX_AUTOMATED_PROJECTS = 10;
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

const findRule = (repo: GitHubRepoPayload) => {
  const fullName = repo.full_name ?? '';
  const name = repo.name ?? '';

  return projectAutomationRules.find((rule) => {
    if (rule.repo === fullName) {
      return true;
    }

    return rule.match?.some((keyword) =>
      `${fullName} ${name} ${repo.description ?? ''}`
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  });
};

const isDisplayableRepo = (repo: GitHubRepoPayload) => {
  if (!repo.full_name || !repo.name || !repo.html_url) {
    return false;
  }

  if (repo.fork || repo.archived || repo.private) {
    return false;
  }

  const rule = findRule(repo);
  return rule?.include !== false;
};

const repoToProject = (repo: GitHubRepoPayload): Project => {
  const rule = findRule(repo);
  const title = rule?.title ?? repo.name ?? 'GitHub Project';
  const link = rule?.link || repo.homepage || repo.html_url || '#';
  const description =
    rule?.description ||
    repo.description ||
    [repo.language, repo.pushed_at ? `updated ${repo.pushed_at.slice(0, 10)}` : '']
      .filter(Boolean)
      .join(' · ') ||
    'GitHub project';

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
    headers: {
      Accept: 'application/vnd.github+json',
    },
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
