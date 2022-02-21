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

interface INotExist {
  type: 'notExist';
}

const lscat: (info: {
  owner: string;
  repo: string;
  path: string;
}) => Promise<IDir | IFileGeted | INotExist | null> = async (info) => {
  try {
    const res = await octokit.client.repos.getContent({
      ...info,
      path: info.path.startsWith('/') ? info.path.replace('/', '') : info.path,
    });
    if (Array.isArray(res.data)) return { type: 'dir', data: res.data };
    if (res.data.type === 'file') return { type: 'file', data: res.data };
    return null;
  } catch (e) {
    // @ts-ignore
    if (e.message === 'Not Found') return { type: 'notExist' };
    return null;
  }
};

export default lscat;
