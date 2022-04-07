/// <reference types="@cloudflare/workers-types" />

/** 事实上这是一个对 Worker 可见的全局对象，为了 TypeScript 类型检查需要进行这样的声明 */
declare class HSPKV {
  declare static get: (key: string) => Promise<string | null>;

  declare static put: (key: string, value: string | ReadableStream | ArrayBuffer) => Promise<void>;

  declare static delete: (key: string) => Promise<void>;
}
