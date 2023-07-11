const express = require('express');
const router = express.Router();
const {getAll, postData, getById, updateData, deleteData} = require('../controllers/categoryController');
//GET ALL CATEGORY
router.get('/category', getAll);

router.post('/category', postData);

router.get('/category/:id', getById);

router.put('/category/:id', updateData);

router.delete('/category/:id', deleteData);

module.exports = router;
