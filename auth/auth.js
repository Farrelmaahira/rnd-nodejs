const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

const { Users } = require('../models/index');

const { responseData } = require('../utils/response-handler');

const { userSignin } = require('../controllers/authController');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports = function (app) {
    passport.use('signup', new Localstrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, async (req, email, password, done) => {
        try {
            const username = req.body.username;

            const hashPass = await bcrypt.hash(password, 10);

            const checkEmail = await Users.count({
                where : {
                    email : email
                }
            });

            if(checkEmail > 0) return done(null, false , {message : 'email sudah digunakan'});

            const data = await Users.create({
                username : username,
                email: email,
                password: hashPass
            });

            return done(null, data);
            
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new Localstrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async (email, password, done) => {
        try {
            const data = await Users.findOne({
                where : {
                    email : email
                }
            });
            
            if(!data) return done(null, false, { messages : 'Email tidak terdaftar'});

            const validate = bcrypt.compare(password, data.password);
            if(!validate) return done(null, false, {message : 'Password salah'});

            let payload = {
                id : data.id,
                username : data.username,
                email : data.email
            };

            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);

            done(null, {
                user : data,
                token : token
            });

        } catch(err) {
            done(err);
        }
    }));

 
    app.use(passport.initialize());
}