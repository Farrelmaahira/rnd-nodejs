const express = require('express');

const router = express.Router();

const {getAll, postData, getById, updateData, deleteData, getCategoryWithBook} = require('../controllers/categoryController');

//GET ALL CATEGORY
router.get('/category', getAll);

//POST CATEGORY
router.post('/category', postData);

//GET CATEGORY BY ID WITH IT BOOKS
// router.get('/category/:id/book', getCategoryWithBook);

//GET CATEGORY BY ID
router.get('/category/:id', getById);

//UPDATE(EDIT) CATEGORY BY ID
router.put('/category/:id', updateData);

//DELETE CATEGORY BY ID
router.delete('/category/:id', deleteData);


module.exports = router;
