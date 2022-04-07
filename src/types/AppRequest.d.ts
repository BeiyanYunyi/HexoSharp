/// <reference types="@cloudflare/workers-types" />

interface Request {
  /** 来自前端的请求，在处理后会有 Json 对象 */
  parsedJson?: Record<string, any> | null;
}
