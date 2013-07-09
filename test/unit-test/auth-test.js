var should = require('should'),
  request = require('supertest');

process.env.NODE_ENV = 'test';
var app = require('./../../app');

describe('GET /login', function() {
  it('should respond with HTML page', function(done) {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});