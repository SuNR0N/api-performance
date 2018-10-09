import { ApplicationConfig } from '@loopback/core';
import {
  RestApplication,
  RestServer,
} from '@loopback/rest';

import { PingController } from './ping-controller';
import { WelcomeController } from './welcome-controller';
import { Sequence } from './sequence';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

export class Application extends RestApplication {
  constructor(options: ApplicationConfig = {
    rest: {
      port: PORT,
    },
  }) {
    super(options);
    this.controller(PingController);
    this.controller(WelcomeController);
    this.sequence(Sequence);
  }

  async start() {
    await super.start();

    if (!(this.options && this.options.disableConsoleLog)) {
      const rest = await this.getServer(RestServer);
      console.info(`LoopBack 4 server is listening on port ${await rest.get('rest.port')} in ${ENVIRONMENT} mode`);
    }
  }
}