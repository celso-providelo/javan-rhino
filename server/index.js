require('babel-register');

const WebPackIsomorphicTools = require('webpack-isomorphic-tools')
const basePath = require('path').resolve(__dirname, '..')

const webpackIsomorphicTools = new WebPackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
.development(true)
.server(basePath, function() {
  const server = require('./server').default; // default import
  server.run(webpackIsomorphicTools);
});
