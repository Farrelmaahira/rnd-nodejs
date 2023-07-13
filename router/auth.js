const express = require('express');

const router = express.Router();

const {userSignup, userSignin} = require('../controllers/authController');

//USER SIGNUP
router.post('/signup', userSignup );

//USER SIGNIN
router.post('/signin', userSignin);

module.exports = router;