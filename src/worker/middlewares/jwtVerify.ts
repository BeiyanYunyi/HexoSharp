/* eslint-disable consistent-return */
import jwt from '@tsndr/cloudflare-worker-jwt';

/** 验证一个 jwt 是否有效，若已失效或不合法则返回 403 */
const jwtVerify = async (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader)
    return new Response(null, { status: 403, headers: { 'Content-Type': 'text/plain' } });
  const sign = authHeader.substring(7);
  const res = await jwt.verify(sign, JWT_SECRET);
  if (!res) return new Response(null, { status: 403, headers: { 'Content-Type': 'text/plain' } });
};

export default jwtVerify;
