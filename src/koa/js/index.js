const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const {
  errorHandler,
  router,
} = require('./handlers');
const { HTTPError } = require('./http-error');

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