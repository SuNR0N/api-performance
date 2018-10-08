const Hapi = require('hapi');

const {
  errorHandler,
  methodNotAllowedHandler,
  notFoundHandler,
  pingHandler,
  welcomeHandler,
} = require('./handlers');

const PORT = process.env.PORT || 3000;

const server = Hapi.server({
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

module.exports = server;