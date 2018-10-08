const httpStatusText = {
  200: 'OK',
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

class HTTPError extends Error {
  constructor(code, message = httpStatusText[code] || 'Unknown Error') {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

module.exports = { HTTPError };