import {
  DefaultSequence,
  RequestContext,
} from '@loopback/rest';
import { HTTPError } from './http-error';

export class Sequence extends DefaultSequence {
  async handle(context: RequestContext) {
    try {
      const route = this.findRoute(context.request);

      const args = await this.parseParams(context.request, route);
      const result = await this.invoke(route, args);
      this.send(context.response, result);
    } catch (err) {
      if (err instanceof HTTPError) {
        context.response.status(err.code);
        this.send(context.response, { message: err.message });
      } else if (err.statusCode === 404) {
        context.response.status(404);
        this.send(context.response, { message: 'Not Found' });
      } else {
        context.response.status(500);
        this.send(context.response, { message: 'Unknown Error' });
      }
    }
  }
}