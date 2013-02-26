
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , band = require('./routes/band')
  , submission = require('./routes/submission')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('very very secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Setup routes.
app.get('/', routes.index);
app.get('/topthree/:band', band.topthree);
app.get('/image/:band', band.image);
app.post('/submit', submission.validate);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
