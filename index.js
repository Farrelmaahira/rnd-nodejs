const express = require('express');
const app = express();
const bookRouter = require('./router/book');
const catRouter = require('./router/category');
const bodyParser = require('body-parser');

//APPLICATION LEVEL MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
    console.log(req.method + req.path);
    next();
});


app.use('/api',bookRouter);
app.use('/api', catRouter);
module.exports = app;



