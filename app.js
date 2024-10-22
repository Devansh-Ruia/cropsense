const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const users = require('./routes/users');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users', users);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
