var express = require('express');
var logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/db")
const session = require("express-session")
const passport = require('passport')
const bcrypt = require('bcrypt')
var port = process.env.PORT || 9000;
var app = express();
dotenv.config({ path: "./config/config.env" })

//connection to DB
connectDB()

//setting logs
app.use(logger('dev'));

//setting json parser
app.use(express.json())

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//setting session middleware
app.use(session({
   secret: "superSecret",
   saveUninitialized: true,
   resave: true
}))



//setting routers
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/tickets', require('./routes/tickets'));



app.listen(port, console.log(`Server running in mode ${process.env.NODE_ENV} at port ${port}`))
