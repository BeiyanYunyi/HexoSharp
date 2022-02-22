import store from '../redux/store';
import octokit from './octokit';

const rm = async (args: { path: string; message: string; sha: string }) => {
  const { owner, repo } = store.getState().settings.settings;
  const res = await octokit.client.repos.deleteFile({ ...args, owner, repo });
  return res;
};

export default rm;
