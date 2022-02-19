/** A fake class */
declare class HSPKV {
  declare static get: (key: string) => Promise<string | null>;

  declare static put: (key: string, value: string | ReadableStream | ArrayBuffer) => Promise<void>;

  declare static delete: (key: string) => Promise<void>;
}

export default HSPKV;
