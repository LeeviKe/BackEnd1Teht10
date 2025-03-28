/*
app.js on express-sovelluksen päätiedosto josta sovellus lähtee käyntiin
*/

const express = require('express');
const session = require('express-session');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const students = require('./routes/students');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*Session käyttöönotto
  Sessio toimii siten että luotaessa sessio syntyy selaimelle automaattisesti cookie jonka
  nimi on connect.sid (sessionid). Se ylläpitää yhteyttä palvelimella olevaan sessioon
  sen sisältämän sessioid:n avulla.
  Itse sessio sisältää sessiomuuttujia, joita voidaan lukea siirryttäessä sivulta toiselle.
  Jos sessiomuuttujana on vaikka salasana, niin sivuille siirryttäessä voidaan tutkia onko
  salasana oikea ja jos on, päästetään käyttäjä sivulle. Session voimassaoloaika on tässä 10 minuuttia.
*/
app.use(
  session({
    secret: 'salausarvo',
    cookie: {
      maxAge: 600000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', index); // index-reitti
app.use('/users', users); // users-reitti
app.use('/students', students);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
