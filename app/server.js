/**
 * Include required modules
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var config = require('./config');
var Item = require('./models/item');
var User = require('./models/user');
var port = process.env.PORT || 8080;
var app = express();


/**
 * Connect to the DB
 */
mongoose.connect(config.db);

require('./config/passport')(passport);

/**
 * Configure Express
 */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname, 'public'));

/**
 * Setup Routes
 */
require('./routes.js')(app, passport, Item);



/**
 * Start App
 */
app.listen(port);
console.log('Magic happens on port ' + port);
