const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {responseData, responseMessage} = require('../utils/response-handler');

//GET BOOK
router.get('/book', (req,res)=>{
    db.query('SELECT * FROM books', function(err, result){
        if(err){
            res.json(err);
        } else {
            console.log('this is book page');
            responseData(res, 200, result)
        }
    });
});

//POST BOOK
router.post('/book', (req,res)=>{
    let data = {
        category_id : 1,
        book : req.body.book,
        created_at : new Date(),
        updated_at : new Date()
    }
    db.query('INSERT INTO books SET ?', data, function(err, result){
       if(err) {
            res.send(err);
       } else {
            responseMessage(res, 201, 'Berhasil memasukan data');
       }
    })
});

//GET BOOK BY ID
router.get('/book/:id', (req,res)=> {
    const id = req.params.id;
    db.query(`SELECT * FROM books WHERE id = ${id}`, (err, result)=>{
        if(err) {
            res.send('Buku tidak ditemukan');
        } 
        console.log(`this is a book with id ${id}`);
        responseData(res, 200, result);
    });
});

//UPDATE BOOK
router.put('/book/:id', (req,res)=>{
    const id = req.params.id;
    const data = {
        category_id : 1,
        book : req.body.book,
        created_at : new Date(),
        updated_at : new Date()
    };
    db.query(`UPDATE books SET ? WHERE id = ${id}`, data, (err, result)=>{
        if(err) { throw err } 
        responseMessage(res, 201, 'Berhasil mengupdate data')
    });
});

//DELETE BOOK
router.delete('/book/:id', (req,res)=>{
    const id = req.params.id;
    db.query(`DELETE FROM books WHERE id = ${id} `, function(err, result){
        if(err) throw err
        responseMessage(res, 200, 'Berhasil menghapus data');
    });
});
module.exports = router