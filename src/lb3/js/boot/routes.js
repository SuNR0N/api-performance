const { HTTPError } = require('../http-error');

const routes = (app) => {
  app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  app.all('/ping', () => {
    throw new HTTPError(405);
  });

  app.post('/welcome', (req, res) => {
    const message = Object.entries(req.body).reduce((msg, [key, value], index, arr) => {
      const lastIndex = arr.length - 1;
      msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
      return msg;
    }, '');
    res
      .status(200)
      .send({ message });
  });

  app.all('/welcome', () => {
    throw new HTTPError(405);
  });

  app.all('*', () => {
    throw new HTTPError(404);
  });
};

module.exports = routes;