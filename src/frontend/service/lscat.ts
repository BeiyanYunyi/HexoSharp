import IFile from '../../types/IFile';
import octokit from './octokit';

interface IDir {
  type: 'dir';
  data: IFile[];
}

interface IFileGeted {
  type: 'file';
  data: IFile;
}

const lscat: (info: {
  owner: string;
  repo: string;
  path: string;
}) => Promise<IDir | IFileGeted | null> = async (info) => {
  const res = await octokit.client.repos.getContent(info);
  if (Array.isArray(res.data)) return { type: 'dir', data: res.data };
  if (res.data.type === 'file') return { type: 'file', data: res.data };
  return null;
};

export default lscat;
