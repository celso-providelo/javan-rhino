require('babel-register');

const WebPackIsomorphicTools = require('webpack-isomorphic-tools')
const basePath = require('path').resolve(__dirname, '..')

global.webpackIsomorphicTools = new WebPackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
.development(true)
.server(basePath, function() {
  require('./server')
});
