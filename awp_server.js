"use strict";
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');
/**
 * Initializations
 */
const port   = 3000;
const host   = '127.0.0.2';
const app    = express();
const routes = require('./public/routes/index.js');
app.use('/views/', express.static(__dirname + 'public/views/'));

// Options
const defaultGetOptions = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
}
const redisOptions = {
  port: 6379
}
/**
 * Template engine
 */
app.set('view engine', 'ejs');
// Routes
routes(app);
app.engine('.ejs', require('ejs').__express);
/**
 * Middleware
 */
app.use(helmet());
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'keyboard cat'
  })
);
app.use('/bootstrap/', express.static(__dirname + 'public/vendor/bootstrap-4.0.0-alpha.6-dist/'));
app.use('/jquery/', express.static(__dirname + 'public/vendor/jquery/'));
app.use('/css/', express.static(__dirname + 'public/resources/css/'));
app.use('/js/', express.static(__dirname + 'public/resources/js/'));
app.use('/images', express.static(__dirname + 'public/resources/images/'));
app.use('/includes/', express.static(__dirname + 'public/includes/'));

//        ROUTES
app.get('/empty', function (req, res, next) {
  let target = req.params.name;
  res.sendFile('views/index.html', defaultGetOptions, function (err) {
    if (err)
      next(err);  
    else
      console.log('Sent:', target);
  });
});
app.get('/about', function (req, res, next) {
  let target = req.params.name;
  res.sendFile('views/about.html', defaultGetOptions, function (err) {
    if (err)
      next(err);  
    else
      console.log('Sent:', target);
  });
});
app.get('/blog', function (req, res, next) {
  let target = req.params.name;
  res.sendFile('views/blog.html', defaultGetOptions, function (err) {
    if (err)
      next(err);  
    else
      console.log('Sent:', target);
  });
});
app.get('/portfolio', function (req, res, next) {
  let target = req.params.name;
  res.sendFile('views/portfolio.html', defaultGetOptions, function (err) {
    if (err)
      next(err);  
    else
      console.log('Sent:', target);
  });
});
//        TEST
app.get('/some_data', function (req, res, next) {
  console.log('GET request to /some_data.');
  next();
}, function (req, res) {
  res.send('GET request to /some_data.');
});
app.get('/some_data_two', function (req, res, next) {
  console.log('GET request to /some_data made.');
  next();
}, function (req, res) {
  res.send('GET request to /some_data_two made.');
});
/**
 * Server
 */
const server = app.listen(port, host, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});