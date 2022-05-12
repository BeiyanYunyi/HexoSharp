import { TemplateList } from '../../types/Template';
import staticIssueName from '../data/staticIssueName';
import router from '../router';
import issueService from '../service/issueService';

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
    if (!target) return new Response(null, { status: 404 });
    return new Response(
      JSON.stringify(target), // 已经 stringify 好了，直接返回就行
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  });
};

export default templateRouter;
