require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session'); // for session
const flash = require('express-flash');
const MongoDbStore = require("connect-mongo")(session); // for storing and automatically removing session from mongodb
const passport = require('passport');

const url = 'mongodb://localhost/momo';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify: true });
const connection = mongoose.connection;
connection
    .once('open', () => {
        console.log('Database connected...')
    })
    .catch(err => {
        console.log('Connection Failed...')
    })

// session store in DB
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24 } // store cookie for 24 hrs
}))

const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()) // use for creating header in request

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global middleare
// Here we are setting session to global so that anyone can accesss
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// set template engine 
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app);

app.listen(3000, () => {
    console.log(`listening on port ${PORT}`)
})
