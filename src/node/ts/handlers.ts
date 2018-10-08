import { HTTPError } from './http-error';
import {
  IRequestData,
  IResponseData,
} from './interfaces';

export function notFound(_data: IRequestData): IResponseData {
  throw new HTTPError(404);
}

export function ping(data: IRequestData): IResponseData<string> {
  if (data.method === 'GET') {
    return {
      payload: 'pong',
      statusCode: 200,
    };
  } else {
    throw new HTTPError(405);
  }
}

export function welcome(data: IRequestData): IResponseData {
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