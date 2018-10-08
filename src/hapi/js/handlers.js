const { HTTPError } = require('./http-error');

const pingHandler = () => {
  return 'pong';
};

const welcomeHandler = (request, h) => {
  const message = Object.entries(request.payload).reduce((msg, [key, value], index, arr) => {
    const lastIndex = arr.length - 1;
    msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
    return msg;
  }, '');
  return h
    .response({ message })
    .code(200);
};

const methodNotAllowedHandler = () => {
  throw new HTTPError(405);
};

const notFoundHandler = () => {
  throw new HTTPError(404);
};

const errorHandler = (request, h) => {
  const {
    code,
    isBoom,
    message,
  } = request.response;
  if (isBoom) {
    const errorCode = code || 500;
    const errorMessage = message || 'Unknown Error';
    return h
      .response({ message: errorMessage })
      .code(errorCode);
  }

  return h.continue;
};

module.exports = {
  errorHandler,
  methodNotAllowedHandler,
  notFoundHandler,
  pingHandler,
  welcomeHandler,
};