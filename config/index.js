const env = process.env.NODE_ENV || 'development';
const debug = require('debug')('block:config');

const configName = `./config.${env}`;
debug(`Loading configuration from ${configName}`);
const config = require(configName);

config.isDevelopmentEnv = () => {
  return env === 'development';
};

module.exports = config;