import octokit from './octokit';

const whoami = async () => {
  const res = await octokit.client.users.getAuthenticated();
  return res;
};

export default whoami;
