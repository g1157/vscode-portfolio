const GITHUB_API_ACCEPT = 'application/vnd.github+json';

export const createGitHubHeaders = (): Record<string, string> => {
  const token =
    process.env.GITHUB_TOKEN?.trim() || process.env.GH_TOKEN?.trim() || '';

  return {
    Accept: GITHUB_API_ACCEPT,
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
