const express = require('express');

const app = express();

const router = express.Router();

const { upload } = require('../middleware/multer');

const {getData, postData, getById, updateData, deleteData, removeCategory } = require('../controllers/bookController');

const passport = require('passport');
require('../auth/auth')(app);

//GET BOOK
router.get('/book', getData);

//POST BOOK
// router.post('/book', [upload.single('file'), passport.authenticate('jwt', {session : false})], postData);
router.post('/book', [upload, passport.authenticate('jwt', {session : false})] ,  postData);

//GET BOOK BY ID
router.get('/book/:id',passport.authenticate('jwt', {session : false}), getById);

//UPDATE BOOK
router.put('/book/:id', passport.authenticate('jwt', {session : false}), updateData);

//DELETE BOOK
router.delete('/book/:id', passport.authenticate('jwt', {session : false}), deleteData);

//REMOVE CATEGORY FROM BOOK
router.delete('/book/:id/remove_category', passport.authenticate('jwt', {session : false}), removeCategory);

module.exports = router