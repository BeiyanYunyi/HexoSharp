/* eslint-disable consistent-return */
const json = async (req: AppRequest) => {
  if (req.headers.get('Content-Type') === 'application/json') {
    try {
      const reqJson = await req.json();
      req.parsedJson = reqJson;
    } catch (e) {
      return new Response(null, { status: 400 });
    }
  }
};

export default json;
