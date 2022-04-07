import IDirState from '../../types/IDirState';
import IFileState from '../../types/IFileState';
import INotExist from '../../types/INotExist';
import octokit from './octokit';

/** 列出文件夹下所有文件，或返回文件内容 */
const lscat: (info: {
  owner: string;
  repo: string;
  path: string;
}) => Promise<IDirState | IFileState | INotExist | null> = async (info) => {
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
