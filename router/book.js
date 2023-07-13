const express = require('express');

const router = express.Router();

const { upload } = require('../middleware/multer');

const {getData, postData, getById, updateData, deleteData, removeCategory } = require('../controllers/bookController');

//GET BOOK
router.get('/book', getData);

//POST BOOK
router.post('/book', upload.single('file'), postData);

//GET BOOK BY ID
router.get('/book/:id', getById);

//UPDATE BOOK
router.put('/book/:id', updateData);

//DELETE BOOK
router.delete('/book/:id', deleteData);

//REMOVE CATEGORY FROM BOOK
router.delete('/book/:id/remove_category', removeCategory);

module.exports = router