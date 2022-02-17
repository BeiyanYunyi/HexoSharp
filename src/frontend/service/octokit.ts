import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ baseUrl: '/api/gh/https://api.github.com' });

export default octokit;
