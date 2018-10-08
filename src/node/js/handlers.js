const { HTTPError } = require('./http-error');

function notFound() {
  throw new HTTPError(404);
}

function ping(data) {
  if (data.method === 'GET') {
    return {
      statusCode: 200,
      payload: 'pong',
    };
  } else {
    throw new HTTPError(405);
  }
}

function welcome(data) {
  if (data.method === 'POST') {
    const message = Object.entries(data.payload).reduce((msg, [key, value], index, arr) => {
      const lastIndex = arr.length - 1;
      msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
      return msg;
    }, '');
    return {
      statusCode: 200,
      payload: { message },
    };
  } else {
    throw new HTTPError(405);
  }
}

module.exports = {
  notFound,
  ping,
  welcome,
};