import octokit from './octokit';

/** 获取当前登录用户的信息，目前未使用 */
const whoami = async () => {
  const res = await octokit.client.users.getAuthenticated();
  return res;
};

export default whoami;
