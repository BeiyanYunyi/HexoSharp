import getOctokit from '../utils/getOctokit';
import hspCrypt from '../utils/hspCrypt';

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
  return res.data;
};

/** 根据标题获取一个 issue
 * @param title 标题
 */
const findByTitle = async (title: string) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.search.issuesAndPullRequests({
    q: [
      `"${title}"`,
      'is:issue',
      'in:title',
      `repo:${config.databaseRepoOwner}/${config.databaseRepo}`,
      `label:${config.issueTag}`,
    ].join(' '),
  });
  const target = res.data.items.filter(
    (issue) => issue.title === title && issue.author_association === 'OWNER',
  );
  if (target.length > 1) throw new Error('More than 1');
  if (target.length === 0) return null;
  return { ...target[0], body: await hspCrypt.decrypt(target[0].body!) };
};

/**
 * 创建一个 issue
 * @param title 标题
 * @param content 内容
 */
const create = async (title: string, content: string) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.create({
    owner: config.databaseRepoOwner,
    repo: config.databaseRepo,
    title,
    body: await hspCrypt.encrypt(content),
    labels: [config.issueTag],
  });
  return res.data;
};

/**
 * 修改一个 issue
 * @param number 编号
 * @param content 内容
 */
const put = async (number: number, content: string) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.update({
    owner: config.databaseRepoOwner,
    repo: config.databaseRepo,
    issue_number: number,
    body: await hspCrypt.encrypt(content),
  });
  return res.data;
};

/**
 * 查找并修改一个 issue，若没有则创建
 * @param title 标题
 * @param content 内容
 */
const upsert = async (title: string, content: string) => {
  const issue = await findByTitle(title);
  if (issue === null) return create(title, content);
  return put(issue.number, content);
};

const issueService = { get, findByTitle, upsert };

export default issueService;
