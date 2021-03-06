/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mers = require('mers'),
  flash = require('connect-flash'),
  config = require('yaml-config')
    .readConfig(__dirname + '/config/config.yml', env);

var app = module.exports = express(),
  env = process.env.NODE_ENV || 'development';


// all environments
app.set('port', process.env.PORT || config.port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser('mywebclass secret cookie'));
if(process.env.NODE_ENV=='production'){
    var RedisSessionStore = require('connect-redis')(express);
    app.use(express.session({store: new RedisSessionStore({'prefix':"core_web_api_session"}), secret: 'hammering  the keyboard'}));
} else {
    app.use(express.session());
}
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, '..', 'users', 'app')));

// Bootstrap db connection
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file) {
  require(models_path + '/' + file);
});

mongoose.connection.once('open', function() {
  // Initial data setup
  require('./lib/initializeData');

  require('./lib/aclInitialization')(mongoose, config);
});

// Configure user authentication
require('./config/passport')(config, passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setup routes
require('./routes/init')(app, passport);

// add REST interface
app.use('/rest', mers({
  mongoose: mongoose
}).rest());

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});