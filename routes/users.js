const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Registration
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (user) {
            return res.send('User already exists');
        } else {
            const newUser = new User({ name, email, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.send('User registered'))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;
