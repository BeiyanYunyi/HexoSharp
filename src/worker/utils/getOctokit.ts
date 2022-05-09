import { Octokit } from '@octokit/rest';
import getConfig from './getConfig';

const getOctokit = async () => {
  const config = await getConfig();
  if (!config) throw new Error('No config');
  const octokit = new Octokit({ auth: config.ghApiToken, request: { redirect: 'follow' } });
  return { octokit, config };
};

export default getOctokit;
