import jwt from '@tsndr/cloudflare-worker-jwt';
import { dcodeIO } from 'bcryptjs';
import router from '../router';

/** 提供用户验证服务 */
const authRouter = () => {
  router.post('/api/auth/', async (req: Request) => {
    if (!req.parsedJson?.password) return new Response(null, { status: 400 });
    const savedPassword = await HSPKV.get('password');
    const objToSign = { exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7) };
    if (savedPassword) {
      const res = await dcodeIO.bcrypt.compare(req.parsedJson.password, savedPassword);
      if (!res) return new Response(null, { status: 401 });
      const signed = await jwt.sign(objToSign, JWT_SECRET);
      return new Response(JSON.stringify({ signed }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    const passwordHash = await dcodeIO.bcrypt.hash(req.parsedJson.password, 10);
    await HSPKV.put('password', passwordHash);
    const signed = await jwt.sign(objToSign, JWT_SECRET);
    return new Response(JSON.stringify({ signed }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  });
};

export default authRouter;
