var express = require('express');

var app = express();

var port = process.env.PORT || 8008;
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app/views'));
//app.set('view engine', 'ejs'); // set up ejs for templating

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  user_id: 'test',
  secret: 'user_login'
}));


// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('Your Application is now running on ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found"});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});

exports = module.exports = app;

