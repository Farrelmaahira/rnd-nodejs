const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const {responseData, responseMessage, responseError} = require('../utils/response-handler');
//LOGIN ROUTRE
router.post('/login', (req,res)=>{
    try {
        const usn = req.body.name;
        const pass = req.body.pass;
        const data = db.query(`SELECT * FROM users WHERE user = '${usn}'`, async (err, result)=>{
            if(result.length > 0) {
                if(await bcrypt.compare(pass, result[0].password)){
                    responseMessage(res, 200, 'Berhasil login');
                } else {
                    responseMessage(res, 300, 'Password salah');
                }
            } else {
                responseMessage(res, 400, 'Akun tidak ditemukan');
            }
        });         
        
    } catch (error) {
       throw error; 
    }
});
//REGISTER ROUTE
router.post('/register', async (req,res)=>{
    const usn = req.body.name;
    const pass = req.body.pass;
    const hash = await bcrypt.hash(pass, 10)
    const data = {
        user : usn,
        password : hash,
        role : 'admin',
        created_at : new Date(), 
        updated_at : new Date() 
    };

    db.query('INSERT INTO users SET ?', data, (err, result, field)=>{
        if(err) throw err
        responseData(res, 200, 'Berhasil terdaftar');
        console.log(field);
    });
});



module.exports = router;