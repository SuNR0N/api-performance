import { Application } from './application';

export async function main() {
  const app = new Application();
  await app.start();
  return app;
}