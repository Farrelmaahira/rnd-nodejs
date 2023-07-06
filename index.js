const express = require('express');
const app = express();
const bookRouter = require('./router/book');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
    console.log(req.method + req.path);
    next();
});


app.use('/api',bookRouter);


module.exports = app;



