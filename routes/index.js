const express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//@desc   Login page
//@route  GET /login
router.get('/login', (req, res, next) => {
   res.render('login', {
      layout: 'login'
   })

});

//@desc   Login page
//@route  POST /login
router.post('/login', (req, res, next) => {
   const { userEmail, userPassword } = req.body
   res.render('login', {
      layout: 'login'
   })

});



//@desc   Register page
//@route  GET  /register
router.get('/register', (req, res, next) => {
   res.render('register', {
      layout: 'login',
      flash: req.flash('msg')
   });
});



//@desc   Receive form data and create user
//@route  POST  /register
router.post('/register', (req, res, next) => {
   const { nickname, userEmail, userPassword1, userPassword2 } = req.body;

   if (userPassword1 === userPassword2) {
      bcrypt.hash(userPassword1, saltRounds, async(err, hash) => {
         try {
            const user = await User.create({
               username: nickname,
               email: userEmail,
               hashedPassword: hash
            })
            req.flash('info', 'User created successfully')
            res.redirect('/tickets')
         } catch (error) {
            req.flash('error', 'Not able to create user')
            res.redirect("/register")
         }
      })
   } else {
      req.flash('error', 'The passwords does not match')
      res.redirect('/register')
   }
});



//@desc   Tickets page
//@route  GET /tickets
router.get('/tickets', function(req, res, next) {
   res.render('tickets');
});


module.exports = router;