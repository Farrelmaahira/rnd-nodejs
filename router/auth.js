const express = require('express');

const router = express.Router();

const {userSignup, userSignin, pasSignup} = require('../controllers/authController');

const passport = require('passport');
require('../auth/auth')(passport);

const { responseData, responseError } = require('../utils/response-handler');

//USER SIGNUP
router.post('/signup', passport.authenticate('signup', {session : false, failureMessage : true} ), (req,res) => {
    try {
        responseData(res, 200, req.user);
    } catch (error) {
        responseMessage(res, 401, error );
    }
});

//USER SIGNIN
router.post('/signin', (req, res, next) => {
    passport.authenticate('login', function(err, user, info){
        if(err) return next(err);
        if(!user) {
            res.status(401);
            res.end(info.message);
            return;
        }
    });
})

module.exports = router;