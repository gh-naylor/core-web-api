/**
 * Initialize Data
 */
var mongoose = require('mongoose'),
  Application = mongoose.model('Application'),
  Service = mongoose.model('Service'),
  config = require('yaml-config')
    .readConfig(__dirname + '/../config/config.yml');

/**
 * Default Services
 */
// SMTP Email
Service.findOne({
  code: 'smtp'
}, function(err, service) {
  if (err) {
    throw new Error(err);
  }
  if (service === null) {
    service = new Service({
      code: 'smtp',
      serviceName: 'Email',
      realm: config.smtp.service,
      username: config.smtp.user,
      key: null,
      secret: config.smtp.pass,
      callbackURL: null,
      active: true
    });
    service.save();
  }
});

// Google+ Account
Service.findOne({
  code: 'google'
}, function(err, service) {
  if (err) {
    throw new Error(err);
  }
  if (service === null) {
    service = new Service({
      code: 'google',
      serviceName: 'Google+',
      realm: config.google.realm,
      username: null,
      key: null,
      secret: null,
      callbackURL: config.google.callbackURL,
      active: true
    });
    service.save();
  }
});