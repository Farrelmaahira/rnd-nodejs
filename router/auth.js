const express = require('express');

const router = express.Router();

const {getUser} = require('../controllers/authController');

router.get('/user', getUser);

module.exports = router;