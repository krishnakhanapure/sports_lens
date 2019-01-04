const passportStrategy = require('./config/passport-strategy');
const authenticate = require('./config/authenticate');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: 'tt.sid',
  secret: 'lg3C^P24k^1f^eIb!3*zyvzMtAx0@gU3',
  resave: false,
  saveUninitialized: false,
}));

app.use(passportStrategy.passport.initialize())
app.use(passportStrategy.passport.session())

app.get('/tt/saml/login', passportStrategy.passport.authenticate('saml'));

