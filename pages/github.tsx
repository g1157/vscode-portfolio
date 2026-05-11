import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import { VscRepo, VscPerson } from 'react-icons/vsc';

import { createGitHubHeaders } from '@/lib/github';
import RepoCard from '@/components/RepoCard';
import { Repo, User } from '@/types';

import styles from '@/styles/GithubPage.module.css';

const DEFAULT_GITHUB_USERNAME = 'g1157';

interface GithubPageProps {
  repos: Repo[];
  user: User;
  username: string;
}

const createFallbackUser = (username: string): User => ({
  login: username,
  avatar_url: `https://github.com/${username}.png`,
  public_repos: 0,
  followers: 0,
});

const normalizeUser = (value: unknown, username: string): User => {
  if (!value || typeof value !== 'object') {
    return createFallbackUser(username);
  }

  const user = value as Record<string, unknown>;

  return {
    login:
      typeof user.login === 'string' && user.login
        ? user.login
        : username,
    avatar_url:
      typeof user.avatar_url === 'string' && user.avatar_url
        ? user.avatar_url
        : `https://github.com/${username}.png`,
    public_repos:
      typeof user.public_repos === 'number' ? user.public_repos : 0,
    followers: typeof user.followers === 'number' ? user.followers : 0,
  };
};

const normalizeRepos = (value: unknown): Repo[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((repo): repo is Record<string, unknown> => !!repo && typeof repo === 'object')
    .map((repo) => ({
      id: typeof repo.id === 'number' ? repo.id : 0,
      name: typeof repo.name === 'string' ? repo.name : 'unknown',
      description: typeof repo.description === 'string' ? repo.description : '',
      language: typeof repo.language === 'string' ? repo.language : '',
      watchers: typeof repo.watchers === 'number' ? repo.watchers : 0,
      forks: typeof repo.forks === 'number' ? repo.forks : 0,
      stargazers_count:
        typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
      html_url: typeof repo.html_url === 'string' ? repo.html_url : '#',
      homepage: typeof repo.homepage === 'string' ? repo.homepage : '',
    }))
    .filter((repo) => repo.id !== 0 && repo.html_url !== '#');
};

const fetchGitHubJson = async (url: string) => {
  const response = await fetch(url, {
    headers: createGitHubHeaders(),
  });

  if (!response.ok) {
    console.warn(`GitHub API request failed: ${response.status} ${url}`);
    return null;
  }

  return response.json();
};

const GithubPage = ({ repos, user, username }: GithubPageProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>GitHub</h1>
        <p className={styles.pageSubtitle}>
          Browse through my GitHub repositories and see what I&apos;ve been
          working on. These are some of my public repositories showcasing
          various projects and skills.
        </p>
      </div>

      <div className={styles.githubPage}>
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <Image
              src={user.avatar_url}
              className={styles.avatar}
              alt={user.login}
              width={100}
              height={100}
              priority
            />
            <div className={styles.userInfo}>
              <h2 className={styles.username}>{user.login}</h2>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <VscRepo className={styles.statIcon} />
                  <span>{user.public_repos} repositories</span>
                </div>
                <div className={styles.statItem}>
                  <VscPerson className={styles.statIcon} />
                  <span>{user.followers} followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Popular Repositories</h3>
        </div>
        <div className={styles.reposContainer}>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
        <div className={styles.contributions}>
          <GitHubCalendar
            username={username}
            hideColorLegend
            hideMonthLabels
            colorScheme="dark"
            theme={{
              dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              light: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            style={{
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || DEFAULT_GITHUB_USERNAME;

  const [userData, repoData] = await Promise.all([
    fetchGitHubJson(`https://api.github.com/users/${username}`),
    fetchGitHubJson(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`
    ),
  ]);

  const user = normalizeUser(userData, username);
  const repos = normalizeRepos(repoData);

  return {
    props: { title: 'GitHub', repos, user, username },
  };
}

export default GithubPage;
