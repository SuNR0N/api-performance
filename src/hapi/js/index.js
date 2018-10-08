const server = require('./server');

const ENVIRONMENT = process.env.NODE_ENV || 'development';

async function start() {
  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.info(`Hapi server is listening on port ${server.info.port} in ${ENVIRONMENT} mode`);
};

start();