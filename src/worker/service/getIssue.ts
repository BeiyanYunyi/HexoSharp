import { Octokit } from '@octokit/rest';
import getConfig from '../utils/getConfig';

const getIssue = async (issueNumber: number) => {
  const config = await getConfig();
  if (!config) return null;
  const octo = new Octokit({ auth: config.ghApiToken, request: { redirect: 'follow' } });
  const res = await octo.issues.get({
    owner: config.owner,
    repo: config.repo,
    issue_number: issueNumber,
  });
  return res;
};

export default getIssue;
