import octokit from '../frontend/service/octokit';
import AsyncReturnType from './AsyncReturnType';

type GetRepoContentData = AsyncReturnType<typeof octokit.repos.getContent>;

export interface IFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string | null;
  git_url: string | null;
  download_url: string | null;
  type: string;
  _links: {
    self: string;
    git: string | null;
    html: string | null;
  };
}

export default GetRepoContentData;
