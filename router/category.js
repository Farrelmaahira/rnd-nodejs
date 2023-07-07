const express = require('express');
const router = express.Router();
const {responseData, responseMessage} = require('../utils/response-handler');

//ROUTER LEVEL MIDDLEWARE : true;
router.use(function(req, res, next){
    const age = req.query.age;
    if(!age) {
        res.send('Gaboleh masuk');
        console.log('kehalang middleware');
    } else if(age < 18) {
        res.send('Masih dibawah umur');
    }
    next();
});

router.get('/category', (req,res)=>{
    responseData(res, 200, {
        'success' : true
    });
});

router.get('/category2', (req,res)=> {
    responseData(res, 200, {
        'success' : true
    });
});

module.exports = router;