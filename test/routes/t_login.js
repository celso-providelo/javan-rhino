import { app } from '../../server/server.js';
import supertest from 'supertest';

describe('app route http status codes', () => {
  it('should be 200 for /', () => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 200 for /about', () => {
    supertest(app)
      .get('/about')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 200 for /login/authenticate', () => {
    supertest(app)
      .get('/login/authenticate')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 200 for /login/verify', () => {
    supertest(app)
      .get('/login/verify')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 404 for /example-404-url', () => {
    supertest(app)
      .get('/example-404-url-haroo')
      .expect('Content-Type', /text\/html/)
      .expect(404)
      .end(function(err) {
        if (err) throw err;
      });
  });
});
