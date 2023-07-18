const express = require('express');

const app = express();

const router = express.Router();

const {userSignup, userSignin, pasSignup} = require('../controllers/authController');

const passport = require('passport');
require('../auth/auth')(app);

const { responseData, responseError } = require('../utils/response-handler');

//USER SIGNUP
router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function(err, user, info) {
        try {
           if(!user) return responseError(res, 401, info.message);
            responseData(res, 200, user); 
        } catch (error) {
            res.send(error);
        }
    })(req,res, next);
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('login', function(err, user, info){
        try {
            if(!user) return responseError(res, 401, info.message);
            responseData(res, 200, user);
        } catch (error) {
            res.send(error); 
        }
    })(req,res,next);
});

module.exports = router;