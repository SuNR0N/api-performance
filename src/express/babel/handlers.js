import { Router } from 'express';

import { HTTPError } from './http-error';

export function errorHandler(err, _req, res, next) {
  if (err instanceof HTTPError) {
    res
      .status(err.code)
      .send({ message: err.message });
  } else if (err) {
    res
      .status(500)
      .send('Unknown Error');
  } else {
    next();
  }
}

export function notFoundHandler() {
  throw new HTTPError(404);
}

export const pingHandler = Router();

pingHandler.all('/', (req, _res, next) => {
  if (req.method !== 'GET') {
    throw new HTTPError(405);
  } else {
    next();
  }
});

pingHandler.get('/', (_req, res) => {
  res
    .status(200)
    .send('pong');
});

export const welcomeHandler = Router();

welcomeHandler.all('/', (req, _res, next) => {
  if (req.method !== 'POST') {
    throw new HTTPError(405);
  } else {
    next();
  }
});

welcomeHandler.post('/', (req, res) => {
  const message = Object.entries(req.body).reduce((msg, [key, value], index, arr) => {
    const lastIndex = arr.length - 1;
    msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
    return msg;
  }, '');
  res
    .status(200)
    .send({ message });
});