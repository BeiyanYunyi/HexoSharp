/** 一个文件 */
export default interface IFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  content?: string;
  url: string;
  html_url: string | null;
  git_url: string | null;
  download_url: string | null;
  type: string;
  _links: {
    self: string;
    git: string | null;
    html: string | null;
  };
}
