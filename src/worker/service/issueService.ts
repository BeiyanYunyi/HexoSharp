import getOctokit from '../utils/getOctokit';

const get = async (issueNumber: number) => {
  const { octokit, config } = await getOctokit();
  const res = await octokit.issues.get({
    owner: config.owner,
    repo: config.repo,
    issue_number: issueNumber,
  });
  return res;
};

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
