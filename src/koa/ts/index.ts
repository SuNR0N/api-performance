import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import {
  errorHandler,
  router,
} from './handlers';
import { HTTPError } from './http-error';

const app = new Koa();
app.use(bodyParser());

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods({
  throw: true,
  methodNotAllowed: () => new HTTPError(405),
}));

app.listen(PORT, () => {
  console.info(`Koa server is listening on port ${PORT} in ${ENVIRONMENT} mode`);
});