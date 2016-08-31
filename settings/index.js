module.exports = {
  APP: {
    PORT: 3000,
    HOST: 'localhost'
  },
  OPENID: {
    VERIFY_URL: 'http://localhost:3000/login/verify',
    REALM: 'http://localhost:3000',
  },
  DATABASE: {
    HOST: 'localhost',
    PORT: 6379,
    SECRET: 'javan rhino'
  },
  UBUNTU_SSO_URL: 'https://login.staging.ubuntu.com'
};
