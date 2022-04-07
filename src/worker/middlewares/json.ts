/* eslint-disable consistent-return */
/** Json 处理中间件 */
const json = async (req: Request) => {
  if (req.headers.get('Content-Type') === 'application/json') {
    try {
      const reqJson = await req.json<Record<string, any> | null>();
      req.parsedJson = reqJson;
    } catch (e) {
      return new Response(null, { status: 400 });
    }
  }
};

export default json;
