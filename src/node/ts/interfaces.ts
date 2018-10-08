import { IncomingHttpHeaders } from 'http';
import { ParsedUrlQuery } from 'querystring';

export interface IRequestData<T = {}> {
  headers: IncomingHttpHeaders;
  method: string;
  payload: T;
  qs: ParsedUrlQuery;
  trimmedPath: string;
}

export interface IResponseData<T = {}> {
  statusCode: number;
  payload?: T;
}

export interface IErrorDTO {
  message: string;
}