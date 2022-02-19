import IFile from '../../types/IFile';
import octokit from './octokit';

const ls: (info: { owner: string; repo: string; path: string }) => Promise<IFile[] | null> = async (
  info,
) => {
  const res = await octokit.repos.getContent(info);
  if (Array.isArray(res.data)) return res.data;
  return null;
};

export default ls;
