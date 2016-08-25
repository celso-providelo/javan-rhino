const Express = require('express');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const match = require('react-router').match;
const RouterContext = require('react-router').RouterContext;
const util = require('util');

const conf = require('../config.js');
// express only routes
const login = require('./routers/login.js');
// shared routes
const routes = require('../src/routes');
// shared components
const Html = require('../src/helpers/Html');
const app = Express();

module.exports = (webpackIsomorphicTools) => {
  app.use('/', login);
  app.use('/', function (req, res) {

    if (process.env.NODE_ENV !== 'production') {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        const component = <RouterContext {...renderProps} />;

        res.status(200);
        res.send('<!doctype html>\n' +
        renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} />));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  const port = process.env.PORT || 3000;
  const address = process.env.ADDRESS || 'localhost';

  const server = app.listen(port, address, () => {
    const host = server.address().address;
    const port = server.address().port;

    util.log('🚂  Express server listening on http://%s:%s 🚂', host, port);
  });
};
