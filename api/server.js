require('rootpath')();
const express = require('express');
const app = express();
// var path = require('path');

const http = require('http');
const server = http.createServer(app);

const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./db/config');
const dotenv = require('dotenv');
dotenv.config();

const errorHandler = require('./helpers/error-handler');

const io = require('socket.io')(server);
require('./helpers/socket')(io);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

require('./routes')(app);

app.use(errorHandler);
console.log('process.env.NODE_ENV ', process.env.NODE_ENV);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});

