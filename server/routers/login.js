const RedisConnect = require('connect-redis');
const openid = require('openid');
const session = require('express-session');
const Router = require('express').Router;

const LaunchpadTeams = require('../lib/openid/teams');
const Macaroons = require('../lib/openid/macaroons.js');
const conf = require('../../config.js');

const router = Router();
const RedisStore = RedisConnect(session);

openid['LaunchpadTeams'] = LaunchpadTeams;
openid['Macaroons'] = Macaroons;

function createRelyingParty(/**teams, cid**/) {
  const extensions = [
    new openid.SimpleRegistration({
      'nickname' : true,
      'email' : true,
      'fullname' : true,
      'language' : true
    })
  ];

  /** TODO
  if (teams) {
    extensions.push(
      new openid.LaunchpadTeams({
        'teams': teams
      })
    );
  }

  // TODO macaroon refresh
  if (cid) {
    extensions.push(
      new openid.Macaroons({
        'cid': cid
      })
    );
  }
   **/

  return new openid.RelyingParty(
    conf.get('OPENID:VERIFY_URL'),
    conf.get('OPENID:REALM'),
    false, // Use stateless verification
    false, // Strict mode
    extensions
  );
}

let rp = createRelyingParty();

router.use(session({
  store: new RedisStore({
    host: conf.get('REDIS:HOST'),
    port: conf.get('REDIS:PORT')
  }),
  secret: conf.get('REDIS:SECRET'),
  resave: false,
  saveUninitialized: false
}));

router.get('/login/authenticate', (req, res) => {
  const identifier = conf.get('UBUNTU_SSO_URL');

  // Resolve identifier, associate, and build authentication URL
  rp.authenticate(identifier, false, (error, authUrl) => {
    if (error) {
      res.writeHead(200);
      res.end('Authentication failed: ' + error.message);
    }
    else if (!authUrl) {
      res.writeHead(200);
      res.end('Authentication failed');
    }
    else {
      res.writeHead(302, { Location: authUrl });
      res.end();
    }
  });
});

router.get('/login/verify', (req, res) => {
  rp.verifyAssertion(req, (error, result) => {
    if (!error) {
      req.session.name = result.fullname;
      req.session.teams = result.teams;
    }

    res.redirect('/');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // TODO
    }
    res.redirect('/');
  });
});

module.exports = router;
