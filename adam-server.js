const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const app        = express();

const port = 3000;

//const static   = require('./pub/static');
//const index    = require('./pub/routes/index');

//View Engine
//app.set('views', path.join(__dirname, './pub/static/views'));
//app.set('view engline', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/test', 'test.js');

//app.use('/', express.static(__dirname + static + '/css/'));
//app.use('/', express.static(__dirname + static + '/img/'));
//app.use('/', express.static(__dirname + static + '/js/'));
//app.use('/', express.static(__dirname + static + '/external/'));

const server = app.listen(port, () => {

    const host = server.address().address;
    const port = server.address().port;

    console.log(`Server running at http://${host}:${port}`);

});