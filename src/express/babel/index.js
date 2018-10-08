import express, { json } from 'express';

import {
  errorHandler,
  notFoundHandler,
  pingHandler,
  welcomeHandler,
} from './handlers';

const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.use('/ping', pingHandler);
app.use('/welcome', welcomeHandler);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Express server is listening on port ${PORT} in ${ENVIRONMENT} mode`);
});