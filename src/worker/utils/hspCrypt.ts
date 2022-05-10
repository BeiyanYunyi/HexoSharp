import * as base65536 from 'base65536';

const salt = 'HexoSharp114514';

/**
 * 可以认为是一个哈希函数，从密码生成加密用的密钥。
 * 接受一个参数作为密码，默认使用 JWT_SECRET 作为密码。
 * @param password 自定义密码，暂未使用。
 */
const getKey = async (password?: string) => {
  const textEncoder = new TextEncoder();
  const passwordBuffer = textEncoder.encode(password || JWT_SECRET);
  const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, [
    'deriveBits',
  ]);
  const saltAry = textEncoder.encode(salt);
  const derivation = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: saltAry, iterations: 1048576 },
    importedKey,
    384,
  );
  const derivedKey = derivation.slice(0, 32);
  const iv = derivation.slice(-16);
  const importedEncryptionKey = await crypto.subtle.importKey(
    'raw',
    derivedKey,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt'],
  );
  return {
    key: importedEncryptionKey,
    iv,
  };
};

/** 加密一段信息
 * @param text - 要被加密的信息
 */
const encrypt = async (text: string) => {
  const keyObject = await getKey();
  const textEncoder = new TextEncoder();
  const textBuffer = textEncoder.encode(text);
  const encryptedText: ArrayBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: keyObject.iv, length: 256 },
    keyObject.key,
    textBuffer,
  );
  return base65536.encode(new Uint8Array(encryptedText));
};

/** 解密一段信息
 * @param cipher - 要被解密的密文
 */
const decrypt = async (cipher: string) => {
  const keyObject = await getKey();
  const decCipher = base65536.decode(cipher);
  const textDecoder = new TextDecoder();
  const decryptedText = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: keyObject.iv, length: 256 },
    keyObject.key,
    decCipher,
  );
  return textDecoder.decode(decryptedText);
};

const hspCrypt = {
  encrypt,
  decrypt,
};

export default hspCrypt;
