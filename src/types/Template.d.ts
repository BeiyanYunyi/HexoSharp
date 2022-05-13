export interface ITemplateBase {
  title: string;
}

export interface ITemplatePosting extends ITemplateBase {
  /** 未加密的内容 */
  content: string;
}

export interface ITemplateInDB extends ITemplatePosting {
  id: string;
}

export interface ITemplateInList extends ITemplateBase {
  issueID: number;
  id: string;
  createAt: number;
  editAt: number;
}

export interface ITemplate extends ITemplateInList {
  content: string;
}

export type TemplateList = ITemplateInList[];
