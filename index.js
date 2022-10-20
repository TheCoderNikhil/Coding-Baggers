require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const ejs = require('ejs')
const methodOverride = require('method-override')
const path = require("path")
const passport = require('passport')
const session = require('express-session')

const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.MY_SECRET,
  resave: false,
  saveUninitialized: true,
}))

require("./config/passport")(passport)

app.use(passport.initialize());
app.use(passport.session());

app.use(require('connect-flash')());

app.locals.errors = null

app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  res.locals.user = req.user;
  next()
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', defaultRoutes)
app.use('/admin', adminRoutes)

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})