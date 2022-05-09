import { encode, decode } from 'base65536';

const salt = 'HexoSharp114514';

const getKey = async (password: string) => {
  const textEncoder = new TextEncoder();
  const passwordBuffer = textEncoder.encode(password);
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

const encrypt = async (text: string, password: string) => {
  const keyObject = await getKey(password);
  const textEncoder = new TextEncoder();
  const textBuffer = textEncoder.encode(text);
  const encryptedText: ArrayBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: keyObject.iv, length: 256 },
    keyObject.key,
    textBuffer,
  );
  return encode(new Uint8Array(encryptedText));
};

const decrypt = async (cipher: string, password: string) => {
  const keyObject = await getKey(password);
  const decCipher = decode(cipher);
  const textDecoder = new TextDecoder();
  const decryptedText = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: keyObject.iv, length: 256 },
    keyObject.key,
    decCipher,
  );
  return textDecoder.decode(decryptedText);
};

const hspCrypt = { encrypt, decrypt };

export default hspCrypt;
