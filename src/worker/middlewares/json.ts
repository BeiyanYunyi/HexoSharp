const json = async (req: Request) => {
  if (req.headers.get('Content-Type') === 'application/json') {
    try {
      const reqJson = await req.json();
      req.json = reqJson as any;
    } catch (e) {
      req.json = undefined as any;
    }
  }
};

export default json;
