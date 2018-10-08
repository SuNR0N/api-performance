const httpStatusText: { [key: number]: string } = {
  200: 'OK',
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

export class HTTPError extends Error {
  constructor(public code: number, public message: string = httpStatusText[code] || 'Unknown Error') {
    super(message);
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}