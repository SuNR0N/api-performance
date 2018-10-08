const { createServer } = require('http');
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');

const { parseJSONToObject } = require('./utils');
const handlers = require('./handlers');
const { HTTPError } = require('./http-error');

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

const requestListener = (request, response) => {
  const parsedUrl = parse(request.url, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const qs = parsedUrl.query;

  const method = request.method.toUpperCase();

  const headers = request.headers;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  request.on('data', (data) => buffer += decoder.write(data));
  request.on('end', async () => {
    const requestHandlerRegExp = /^(\w+)/;
    const requestHandlerRegExpExec = requestHandlerRegExp.exec(trimmedPath);
    const basePath = requestHandlerRegExpExec && requestHandlerRegExpExec[1];
    const requestHandler = basePath && router[basePath] ? router[basePath] : handlers.notFound;

    const data = {
      headers,
      method,
      payload: parseJSONToObject(buffer),
      qs,
      trimmedPath,
    };

    let error;
    let payload;
    let statusCode;

    try {
      const response = requestHandler(data);
      statusCode = response.statusCode || 200;
      if (response.payload) {
        payload = JSON.stringify(response.payload);
      }
    } catch (err) {
      if (err instanceof HTTPError) {
        statusCode = err.code;
        error = { message: err.message };
      } else {
        statusCode = 500;
        error = { message: 'Unknown Error' };
      }
      payload = JSON.stringify(error);
    } finally {
      if (payload) {
        response.setHeader('Content-Type', 'application/json');
      }
      response.writeHead(statusCode);
      response.end(payload);
    }
  });
}

const router = {
  ping: handlers.ping,
  welcome: handlers.welcome,
};

const server = createServer(requestListener);

server.listen(PORT, () => {
  console.info(`Node server is listening on port ${PORT} in ${ENVIRONMENT} mode`);
});
