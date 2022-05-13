import { ITemplate, ITemplateInDB, ITemplatePosting, TemplateList } from '../../types/Template';
import staticIssueName from '../data/staticIssueName';
import Resp404 from '../responses/Resp404';
import router from '../router';
import issueService from '../service/issueService';
import getHspID from '../utils/getHspID';

const getTemplateIndex = async () => {
  const res = await issueService.findByTitle(staticIssueName.templateIndex);
  if (res === null) {
    await issueService.upsert(staticIssueName.templateIndex, JSON.stringify([]));
    return [];
  }
  return JSON.parse(res.body) as TemplateList;
};

/** 提供与文章模板相关的服务 */
const templateRouter = () => {
  router.get('/api/template', async () => {
    const res = await getTemplateIndex();
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  });

  router.get('/api/template/:id', async (req) => {
    const templateList = await getTemplateIndex();
    const target = templateList.find((template) => template.id === req.params!.id);
    if (!target) return Resp404();
    const res = await issueService.get(target.issueID);
    if (!res) return Resp404();
    const template: ITemplate = {
      ...target,
      content: (JSON.parse(res.body) as ITemplateInDB).content,
    };
    return new Response(JSON.stringify(template), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  });

  router.post('/api/template', async (req: Request) => {
    if (!req.parsedJson) return new Response(null, { status: 400 });
    const templateList = await getTemplateIndex();
    const reqBody = { ...(req.parsedJson as ITemplatePosting), id: getHspID() };
    const res = await issueService.upsert(`H#Template-${reqBody.id}`, JSON.stringify(reqBody));
    const infoToInsert = {
      issueID: res.number,
      id: reqBody.id,
      title: reqBody.title,
      createAt: Date.now(),
      editAt: Date.now(),
    };
    templateList.push(infoToInsert);
    await issueService.upsert(staticIssueName.templateIndex, JSON.stringify(templateList));
    const infoToReturn: ITemplate = { ...infoToInsert, content: reqBody.content };
    return new Response(JSON.stringify(infoToReturn), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  });

  router.put('/api/template/:id', async (req: Request) => {
    if (!req.parsedJson) return new Response(null, { status: 400 });
    const templateID = (req as unknown as { params: { id: string } }).params!.id;
    const modifyTemplate = req.parsedJson as Partial<ITemplatePosting>;
    const templateList = await getTemplateIndex();
    const target = templateList.find((template) => template.id === templateID);
    if (!target) return Resp404();
    const res = await issueService.get(target.issueID);
    if (!res) return Resp404();
    // 更新内容
    const detail = JSON.parse(res.body) as ITemplateInDB;
    const modifiedTemplate: ITemplateInDB = { ...detail, ...modifyTemplate, id: detail.id };
    const putRes = await issueService.put(target.issueID, JSON.stringify(modifiedTemplate));
    const infoToReturn: ITemplate = {
      ...target,
      content: (JSON.parse(putRes.body!) as ITemplateInDB).content,
    };
    // 更新列表
    const newTemplateList = templateList.map((template) => {
      if (template.id !== templateID) return template;
      return { ...template, editAt: Date.now() };
    });
    await issueService.upsert(staticIssueName.templateIndex, JSON.stringify(newTemplateList));
    return new Response(JSON.stringify(infoToReturn), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  });
};

export default templateRouter;
