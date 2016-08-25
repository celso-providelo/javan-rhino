var nconf = require('nconf');
var base = require('./settings');

// allow these overrides from env
nconf.env([
  'APP:PORT',
  'REDIS:HOST',
  'REDIS:PORT',
  'REDIS:SECRET'
]);
nconf.defaults(base);

module.exports = nconf;
