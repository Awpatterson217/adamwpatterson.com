const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const port = 3000;
const app = express();
app.use(helmet());

const options = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
};

app.get('/test', function (req, res, next) {

  let target = req.params.name;
  res.sendFile('index.html', options, function (err) {
    if (err) 
      next(err);
    else 
      console.log('Sent:', target);
  });

});

app.get('/some_data', function (req, res, next) {
  console.log('GET request to /some_data.')
  next()
}, function (req, res) {
  res.send('GET request to /some_data.')
})

//app.use('/', express.static(__dirname + 'public/static/css/'));
//app.use('/', express.static(__dirname + 'public/static/img/'));
//app.use('/', express.static(__dirname + 'public/static/js/'));
//app.use('/', express.static(__dirname + 'public/static/external/'));

const server = app.listen(port, () => {

    const host = server.address().address;
    const port = server.address().port;

    console.log(`Server running at http://${host}:${port}`);

});