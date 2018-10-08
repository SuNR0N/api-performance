import { Server } from 'hapi';

import {
  errorHandler,
  methodNotAllowedHandler,
  notFoundHandler,
  pingHandler,
  welcomeHandler,
} from './handlers';

const PORT = process.env.PORT || 3000;

export const server = new Server({
  host: 'localhost',
  port: PORT,
});

server.route({
  method: 'GET',
  path: '/ping',
  handler: pingHandler,
});

server.route({
  method: '*',
  path: '/ping',
  handler: methodNotAllowedHandler,
});

server.route({
  method: 'POST',
  path: '/welcome',
  handler: welcomeHandler,
});

server.route({
  method: '*',
  path: '/welcome',
  handler: methodNotAllowedHandler,
});

server.route({
  method: '*',
  path: '/{any*}',
  handler: notFoundHandler,
});

server.ext('onPreResponse', errorHandler);