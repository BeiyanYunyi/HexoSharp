/* eslint-disable no-restricted-globals */
import handleRequest from './handler';

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request, event));
});
