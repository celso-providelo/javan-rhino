import Express from 'express';
import React from 'react';
import util from 'util';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

// react-router routes
import routes from '../src/routes';
import Html from '../src/helpers/Html';
import webpackConfig from '../webpack/dev-config';

// expressjs only routes
import login from './routers/login.js';

//import Store from './middleware/storeapi';
//const store = new Store();
const app = Express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath })
);

  /**
router.use('/snap/purchases/:id', function(req, res) {
  // TODO also pass macaroon bits
  req.pipe(store.snap.purchases(req.params.id))
    .on('response', function(response) {
      // send JSON rather than HTML, FIXME in upstream api
      if (response.statusCode === 404) {
        req.pipe(res.json({ error: 404 }));
      }
      if (response.statusCode === 200) {
        req.pipe(res);
      }
      // TODO handle errors
    });
});
   **/

app.use('/', login);
//app.use('/api', router);
app.use(webpackHotMiddleware(compiler));
app.use(Express.static('public'));

app.use('/', function (req, res) {

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
      renderToString(<Html component={component} />));
    } else {
      res.status(404).send('Not found');
    }
  });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  util.log('try-auth app listening at http://%s:%s', host, port);
});

export default app;
