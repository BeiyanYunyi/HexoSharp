import getOctokit from '../utils/getOctokit';

/**
 * 获取一个 issue
 * @param issueNumber issue 编号
 */
const get = async (issueNumber: number) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.get({
    owner: config.owner,
    repo: config.repo,
    issue_number: issueNumber,
  });
  return res;
};

/**
 * 创建一个 issue
 * @param content 内容
 * @param title 标题
 * @param label 标签
 */
const create = async (content: string, title: string, label: string) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.create({
    owner: config.owner,
    repo: config.repo,
    title,
    body: content,
    labels: [label],
  });
  return res;
};

const issueService = { get, create };

export default issueService;
