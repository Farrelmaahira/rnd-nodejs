require('dotenv').config();
const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

const { Users } = require('../models/index');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { ExtractJwt } = require('passport-jwt');

const JWTStrategy = require('passport-jwt').Strategy;

const Joi = require('joi');



var validate = (data) => {
    const schema = Joi.object({
        username : Joi.string().required() 
    });
    return schema.validate(data);
}

module.exports = function (app) {
    passport.use('signup', new Localstrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, async (req, email, password, done) => {
        let dataValidated = { username : req.body.username};
        const val = validate(dataValidated);
        try {
            if(val.error) return done(null, false, {message : val.error.details[0].message});

            const username = req.body.username;

            const hashPass = await bcrypt.hash(password, 10);

            const checkEmail = await Users.count({
                where : {
                    email : email
                }
            });

            if(checkEmail > 0) return done(null, false, {message : 'Email has been taken'}); 
            // if(checkEmail > 0) throw new Error('email sudah digunakan');

            const data = await Users.create({
                username : username,
                email: email,
                password: hashPass
            });
            let payload = {
                "id" : data.id,
                "username" : data.username,
                "email" : data.email
            };
            
            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
            
            const res = {
                user : data,
                token : token
            };

            return done(null, res);
            
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new Localstrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done) => {

        try {
            const data = await Users.findOne({
                where : {
                    email : email
                }
            });
            
            if(!data) return done(null , false, {message : 'Email unknown'}); 

            const validate = await bcrypt.compare(password, data.password);
            if(!validate) return done(null, false, {message : 'Wrong password'}) 

            let payload = {
                id : data.id,
                username : data.username,
                email : data.email
            };

            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY , { expiresIn : '1h'});

            done(null, {
                user : data,
                token : token
            });

        } catch(err) {
            done(err);
        }
    }));
    
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_PRIVATE_KEY;  
    passport.use(new JWTStrategy(opts, async (token, done) => {
        try {
            return done(null, token);
        } catch (error) {
           done(error); 
        }
    }));
    
 
    app.use(passport.initialize());
}
