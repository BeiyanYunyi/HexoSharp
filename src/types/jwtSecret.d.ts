/// <reference types="@cloudflare/workers-types" />

/** 事实上这是个对 Worker 可见的全局变量，为了 TypeScript 类型检查需要手动声明 */
declare const JWT_SECRET: string;
