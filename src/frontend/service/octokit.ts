import { Octokit } from '@octokit/rest';

class OctoClient {
  client = new Octokit({ baseUrl: '/api/gh/https://api.github.com' });

  auth(token?: string) {
    if (token) {
      this.client = new Octokit({ baseUrl: '/api/gh/https://api.github.com', auth: token });
    }
  }
}

const octokit = new OctoClient();

export default octokit;
