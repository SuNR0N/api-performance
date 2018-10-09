import loopback from 'loopback';
import boot from 'loopback-boot';

const app = module.exports = loopback();

app.start = () => {
  return app.listen(() => {
    app.emit('started');
    console.info(`LoopBack 3 server is listening on port ${app.get('port')} in ${app.get('env')} mode`);
  });
}

boot(app, __dirname, (err) => {
  if (err) {
    throw err;
  }
  if (require.main === module) {
    app.start();
  }
});