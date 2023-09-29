const express = require('express');

const app = require('./index'); 

const db = require('./models/index');

require('dotenv').config()

app.listen(process.env.PORT, function(){
    console.log(`This server is running on port : ${process.env.PORT}`)
});