import {
  get,
  del,
  post,
  put,
  patch,
} from '@loopback/rest';

import { HTTPError } from './http-error';

export class PingController {
  @get('/ping')
  getPing() {
    return 'pong';
  }

  @del('/ping')
  delPing() {
    throw new HTTPError(405);
  }

  @post('/ping')
  postPing() {
    throw new HTTPError(405);
  }

  @put('/ping')
  putPing() {
    throw new HTTPError(405);
  }

  @patch('/ping')
  patchPing() {
    throw new HTTPError(405);
  }
}