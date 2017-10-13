"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');

const port   = 3000;
const host   = '127.0.0.2';
const app    = express();
const routes = require('./local/routes');
const limiter = require('express-limiter')(app, client);
const parser  = bodyParser.urlencoded({
  extended: false
});

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    key: 'sessionid',
    cookie: {
      //secure: true,
      httpOnly: true,
      expires: new Date( Date.now() + 60 * 60 * 1000 )
    }
  })
);

app.use(parser); 

app.use('/bootstrap', express.static(__dirname + '/public/vendor/bootstrap-4.0.0-alpha.6-dist/'));
app.use('/jquery', express.static(__dirname + '/public/vendor/jquery/'));
app.use('/vue', express.static(__dirname + '/public/vendor/vue/'));
app.use('/mdb', express.static(__dirname + '/public/vendor/mdb/'));
app.use('/css', express.static(__dirname + '/public/resources/css/'));
app.use('/js', express.static(__dirname + '/public/resources/js/'));
app.use('/images', express.static(__dirname + '/public/resources/images/'));

for(let route in routes){
  app.use(routes[route]);
}

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
  