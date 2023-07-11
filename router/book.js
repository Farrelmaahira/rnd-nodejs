const express = require('express');
const router = express.Router();
const {getData, postData, getById, updateData, deleteData} = require('../controllers/book');

//GET BOOK
router.get('/book', getData);

//POST BOOK
router.post('/book', postData);

//GET BOOK BY ID
router.get('/book/:id', getById);

//UPDATE BOOK
router.put('/book/:id', updateData);

//DELETE BOOK
router.delete('/book/:id', deleteData);

router.get('/book/testing');
module.exports = router