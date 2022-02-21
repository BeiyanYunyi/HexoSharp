import store from '../redux/store';
import octokit from './octokit';

const createOrUpdate = async ({
  path,
  content,
  message,
  sha,
}: {
  path: string;
  content: string;
  message: string;
  sha?: string;
}) => {
  const { owner, repo } = store.getState().settings.settings;
  const res = await octokit.client.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    content,
    message,
    sha,
  });
  return res;
};

export default createOrUpdate;
