var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/db")
const exphbs = require("express-handlebars")
const session = require("express-session")
const flash = require('express-flash')
const passport = require('passport')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const toastr = require('express-toastr')
var port = 9000;
var app = express();
dotenv.config({ path: "./config/config.env" })

//connection to DB
connectDB()

//view engine setup
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

//setting logs
app.use(logger('dev'));

//setting json parser
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//setting session middleware
app.use(session({
   secret: "superSecret",
   saveUninitialized: true,
   resave: true
}))

//setting static folder
app.use(express.static(path.join(__dirname, 'public')));

//connecting Flash
app.use(flash())

//connecting toastr
app.use(toastr());


//setting flash global vars
app.use((req, res, next) => {
   res.locals.succes = req.flash('succes');
   res.locals.error = req.flash('error');
   res.locals.error_msg = req.flash('error_msg');
   next();
})


//setting routers
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/tickets', require('./routes/tickets'));



app.listen(process.env.NODE_ENV, console.log(`Server running in mode ${process.env.NODE_ENV} at port ${port}`))
