const debug = require('debug')('bc:server');

const app = require('./app');
const server = require('http').createServer(app);
const db = require('./models');

(async () => {
  try {
    debug('Connecting to Database...');
    await db.sequelize.authenticate();
    debug('Connecting to Database success');
    server.listen(8080, () => {
      debug('Server listening on port ' + server.address().port);
    });
  } catch(e) {
    debug('Connecting to Database failed', e);

  }
})();
