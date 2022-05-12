import * as base65536 from 'base65536';

const getHspID = () => {
  const uuidStr = crypto.randomUUID().replace(/-/g, '');
  const uuidAry = new Uint8Array(16);
  for (let i = 0; i < 16; i += 1) {
    const j = i * 2;
    const strSlice = uuidStr.substring(j, j + 2);
    uuidAry[i] = Number.parseInt(strSlice, 16);
  }
  return base65536.encode(uuidAry);
};

export default getHspID;
