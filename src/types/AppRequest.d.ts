/// <reference types="@cloudflare/workers-types" />

interface Request {
  parsedJson?: Record<string, any> | null;
}
