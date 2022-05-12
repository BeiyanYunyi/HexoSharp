export interface ITemplateInList {
  issueID: number;
  id: string;
  title: string;
}

export interface ITemplate extends ITemplateInList {
  content: string;
}

export type TemplateList = ITemplateInList[];
