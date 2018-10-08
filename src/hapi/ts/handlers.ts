import {
  Request,
  ResponseToolkit,
} from 'hapi';

import { HTTPError } from './http-error';

export const pingHandler = () => {
  return 'pong';
};

export const welcomeHandler = (request: Request, h: ResponseToolkit) => {
  const message = Object.entries(request.payload).reduce((msg, [key, value], index, arr) => {
    const lastIndex = arr.length - 1;
    msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
    return msg;
  }, '');
  return h
    .response({ message })
    .code(200);
};

export const methodNotAllowedHandler = () => {
  throw new HTTPError(405);
};

export const notFoundHandler = () => {
  throw new HTTPError(404);
};

export const errorHandler = (request: Request, h: ResponseToolkit) => {
  const {
    code,
    isBoom,
    message,
  } = request.response as any;
  if (isBoom) {
    const errorCode = code || 500;
    const errorMessage = message || 'Unknown Error';
    return h
      .response({ message: errorMessage })
      .code(errorCode);
  }

  return h.continue;
};