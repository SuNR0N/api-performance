import Router from 'koa-router';

import { HTTPError } from './http-error';

export const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

router.post('/welcome', async (ctx) => {
  const message = Object.entries(ctx.request.body).reduce((msg, [key, value], index, arr) => {
    const lastIndex = arr.length - 1;
    msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
    return msg;
  }, '');
  ctx.body = { message };
});

export const errorHandler = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      throw new HTTPError(404);
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      ctx.status = err.code;
      ctx.body = { message: err.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Unknown Error' };
    }
  }
}