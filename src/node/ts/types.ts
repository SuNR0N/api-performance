import {
  IRequestData,
  IResponseData,
} from './interfaces';

export type RequestHandler<Q = {}, S = {}> = (requestData: IRequestData<Q>) => IResponseData<S>;