import getOctokit from '../utils/getOctokit';

/**
 * 获取一个 issue
 * @param issueNumber issue 编号
 */
const get = async (issueNumber: number) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.get({
    owner: config.databaseRepoOwner,
    repo: config.databaseRepo,
    issue_number: issueNumber,
  });
  return res;
};

/**
 * 创建一个 issue
 * @param content 内容
 * @param title 标题
 */
const create = async (content: string, title: string) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.create({
    owner: config.databaseRepoOwner,
    repo: config.databaseRepo,
    title,
    body: content,
    labels: [config.issueTag],
  });
  return res;
};

const issueService = { get, create };

export default issueService;
