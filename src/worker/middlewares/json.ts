const json = async (req: AppRequest) => {
  if (req.headers.get('Content-Type') === 'application/json') {
    try {
      const reqJson = await req.json();
      req.parsedJson = reqJson;
    } catch (e) {
      req.parsedJson = undefined;
    }
  }
};

export default json;
