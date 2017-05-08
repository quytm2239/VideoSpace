/*------------------------------------------------------------------------------
*-------------------------[Get all necessary modules]---------------------------
*-----------------------------------------------------------------------------*/
var rootDir = __dirname;

var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
var morgan = require('morgan');
//var mysql = require('mysql');
var winston = require('winston');

var schedule = require('node-schedule');

var fs = require('fs');
// var redis = require('redis');
// // var readChunk = require('read-chunk');
// // var fileType = require('file-type');
//
// var https = require('https');
// var privateKey  = fs.readFileSync('/etc/letsencrypt/live/findlove.cf/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/findlove.cf/fullchain.pem', 'utf8');
//
// var credentials = {key: privateKey, cert: certificate};
//
// var httpsServer = https.createServer(credentials, app);

// get our predefined file
var config = require('./config');
var errcode = require('./errcode');
var utils = require('./utils');
var show_clientip = require('./middleware/show_clientip');

// create instance of "pool" mySql connection
//var pool = mysql.createPool(config.db_config);

// plug config and module
app.set('port', config.PORT || process.env.port || 1234);
//app.set('super_secret', config.super_secret); // secret variable
app.set('utils',utils);
app.set('errcode',errcode);
app.set('upload_dir',__dirname + '/uploaded_image');
/*
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',  '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
*/

// setup parser for request body content
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/public'));
app.use(show_clientip);

//=========================== write log to file ================================
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level:            'debug',
      filename:         './all-logs.log',
      handleExceptions: true,
      json:             false,
      maxsize:          104857600, //100MB
      maxFiles:         10,
      colorize:         false
    })
    // ,
    // new winston.transports.Console({
    //   level:            'debug',
    //   handleExceptions: true,
    //   json:             false,
    //   colorize:         true
    // })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

app.use(morgan(
	'{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: logger.stream}));
//=========================== write log to file ================================

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// app is express's app
// setting is defined in /config
routes = require('./routes')(app, config);
