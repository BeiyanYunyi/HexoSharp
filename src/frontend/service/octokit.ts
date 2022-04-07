import { Octokit } from '@octokit/rest';

/** 保存 Octokit 实例，以便用户验证 */
class OctoClient {
  client = new Octokit({ baseUrl: '/api/gh/https://api.github.com' });

  auth(token?: string) {
    if (token) {
      this.client = new Octokit({ baseUrl: '/api/gh/https://api.github.com', auth: token });
    }
  }
}

/** 一个 Octokit 实例 */
const octokit = new OctoClient();

export default octokit;
