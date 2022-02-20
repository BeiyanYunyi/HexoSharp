/* eslint-disable consistent-return */
import jwt from '@tsndr/cloudflare-worker-jwt';
import JWT_SECRET from '../../types/jwtSecret';

const jwtVerify = async (req: AppRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader)
    return new Response(null, { status: 403, headers: { 'Content-Type': 'text/plain' } });
  const sign = authHeader.substring(7);
  const res = await jwt.verify(sign, JWT_SECRET);
  if (!res) return new Response(null, { status: 403, headers: { 'Content-Type': 'text/plain' } });
};

export default jwtVerify;
