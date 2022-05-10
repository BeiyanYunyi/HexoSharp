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
    256,
  );
  const importedEncryptionKey = await crypto.subtle.importKey(
    'raw',
    derivation,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt'],
  );
  return importedEncryptionKey;
};

/** 加密一段信息
 * @param text - 要被加密的信息
 */
const encrypt = async (text: string) => {
  const key = await getKey();
  const textEncoder = new TextEncoder();
  const textBuffer = textEncoder.encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedText: ArrayBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv, length: 256 },
    key,
    textBuffer,
  );
  const encryptedTextAry = new Uint8Array(encryptedText);
  const aryToEncode = new Uint8Array(iv.length + encryptedTextAry.length);
  aryToEncode.set(iv);
  aryToEncode.set(encryptedTextAry, iv.length);
  return base65536.encode(aryToEncode);
};

/** 解密一段信息
 * @param cipher - 要被解密的密文
 */
const decrypt = async (cipher: string) => {
  const key = await getKey();
  const decCipher = base65536.decode(cipher);
  const iv = decCipher.slice(0, 16);
  const decryptedText = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv, length: 256 },
    key,
    decCipher.slice(16),
  );
  const textDecoder = new TextDecoder();
  return textDecoder.decode(decryptedText);
};

const hspCrypt = {
  encrypt,
  decrypt,
};

export default hspCrypt;
