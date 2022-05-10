import { Octokit } from '@octokit/rest';
import ISettings from '../../types/ISettings';
import getConfig from './getConfig';

/** 在后端获取 `Octokit` 的实例。由于 Cloudflare Worker
 * 的特性，实例不能保存，只能每次获取。 */
const getOctokit = async () => {
  const config = await getConfig();
  if (!config) throw new Error('No config');
  const octokit = new Octokit({ auth: config.ghApiToken, request: { redirect: 'follow' } });
  const configToReturn: ISettings = {
    ...config,
    databaseRepo: config.databaseRepo || config.repo,
    databaseRepoOwner: config.databaseRepoOwner || config.owner,
    issueTag: config.issueTag || 'HexoSharp',
  };
  return { octokit, config: configToReturn };
};

export default getOctokit;
