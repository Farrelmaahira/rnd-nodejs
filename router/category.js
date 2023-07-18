const express = require('express');

const app = express();

const router = express.Router();

const {getAll, postData, getById, updateData, deleteData, getCategoryWithBook} = require('../controllers/categoryController');

const passport = require('passport');
require('../auth/auth')(app);
//GET ALL CATEGORY
router.get('/category',passport.authenticate('jwt', {session : false}), getAll);

//POST CATEGORY
router.post('/category', passport.authenticate('jwt', {session:false}), postData);

//GET CATEGORY BY ID
router.get('/category/:id', passport.authenticate('jwt', {session : false}), getById);

//UPDATE(EDIT) CATEGORY BY ID
router.put('/category/:id', passport.authenticate('jwt', {session : false}), updateData);

//DELETE CATEGORY BY ID
router.delete('/category/:id', passport.authenticate('jwt', {session :false}), deleteData);


module.exports = router;
