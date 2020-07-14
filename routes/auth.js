const express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//@desc redirect to login page
//@route /auth/
router.get('/', (req, res) => {
    res.redirect("/login")
})

//@desc   Login page
//@route  GET /login
router.get('/login', (req, res, next) => {
    console.log('we are at the router auth/login')
    res.render('login', {
        layout: 'login',
    })

});

//@desc   Login page
//@route  POST /login
router.post('/login', async(req, res, next) => {
    const { userEmail, userPassword } = req.body

    try {
        const user = await User.findOne({ email: userEmail });

        bcrypt.compare(userPassword, user.hashedPassword, function(err, result) {
            if (err) {
                req.flash('error', "first error statement")
                return res.redirect('/login')
            }
            if (result) {
                req.session['user'] = user.nickname;
                req.session['userEmail'] = user.email;

                return res.redirect('/tickets/all')
            } else {
                res.flash('error', 'Invalid Credentials')
                return req.redirect('/login')
            }
        });
    } catch (error) {
        req.flash('error', "entering in catch")
        res.redirect('/login', )
    }
});

//@desc   Register page
//@route  GET  /register
router.get('/register', (req, res, next) => {
    res.render('register', {
        layout: 'login',
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
                req.flash('succes', `User created successfully. \n You are now able to log in ${nickname} 👍`)
                res.redirect('/login')
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


module.exports = router;