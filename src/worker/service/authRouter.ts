import jwt from '@tsndr/cloudflare-worker-jwt';
import HSPKV from '../../types/HSPKV';
import JWT_SECRET from '../../types/jwtSecret';
import router from '../router';

const authRouter = () => {
  router.post('/api/auth/', async (req: AppRequest) => {
    if (!req.parsedJson?.password) return new Response(null, { status: 400 });
    const savedPassword = await HSPKV.get('password');
    const objToSign = { exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7) };
    if (savedPassword) {
      const res = req.parsedJson.password === savedPassword;
      if (!res) return new Response(null, { status: 401 });
      const signed = await jwt.sign(objToSign, JWT_SECRET);
      return new Response(JSON.stringify({ signed }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    await HSPKV.put('password', req.parsedJson.password);
    const signed = await jwt.sign(objToSign, JWT_SECRET);
    return new Response(JSON.stringify({ signed }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  });
};

export default authRouter;
