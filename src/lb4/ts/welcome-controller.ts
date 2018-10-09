import {
  get,
  del,
  post,
  put,
  patch,
  requestBody,
} from '@loopback/rest';

import { HTTPError } from './http-error';

export class WelcomeController {
  @get('/welcome')
  getWelcome() {
    throw new HTTPError(405);
  }

  @del('/welcome')
  delWelcome() {
    throw new HTTPError(405);
  }

  @post('/welcome')
  postWelcome(
    @requestBody() body: any
  ) {
    const message = Object.entries(body).reduce((msg, [key, value], index, arr) => {
      const lastIndex = arr.length - 1;
      msg += `${key} ${value}${index !== lastIndex ? ' ' : ''}`;
      return msg;
    }, '');
    return { message };
  }

  @put('/welcome')
  putWelcome() {
    throw new HTTPError(405);
  }

  @patch('/welcome')
  patchWelcome() {
    throw new HTTPError(405);
  }
}