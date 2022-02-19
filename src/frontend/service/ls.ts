import GetRepoContentData from '../../types/GetRepoContentData';
import octokit from './octokit';

const ls: (info: { owner: string; repo: string; path: string }) => Promise<GetRepoContentData> = (
  info,
) => octokit.repos.getContent(info);

export default ls;
