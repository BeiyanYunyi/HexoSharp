import { Router } from 'itty-router';

// a generic error handler
const errorHandler = (error: any) =>
  new Response(error.message || 'Server Error', { status: error.status || 500 });

// and the new-and-improved itty
const ThrowableRouter = (options = {}) =>
  new Proxy(Router(options), {
    get:
      (obj, prop) =>
      (...args: any[]) =>
        // @ts-ignore
        prop === 'handle' ? obj[prop](...args).catch(errorHandler) : obj[prop](...args),
  });

// 100% drop-in replacement for Router
const router = ThrowableRouter();

export default router;
