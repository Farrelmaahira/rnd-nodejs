const express = require('express');

const app = express();

const bookRouter = require('./router/book');

const catRouter = require('./router/category');

const authRouter = require('./router/auth');

const bodyParser = require('body-parser');

const { responseMessage, responseError } = require('./utils/response-handler');

const router = express.Router();

//APPLICATION LEVEL MIDDLEWARE
const middleware = router.use(function(req,res,next){
    responseError(res, 404, '404 NOT FOUND!!');
    console.log('404 not found');
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
    console.log(`${req.method} \t ${req.path}`);
    next();
});

app.use('/api/auth', authRouter);

app.use('/api', bookRouter);

app.use('/api', catRouter);

app.use(middleware);

app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send({ message: err.message, stack: err.stack });
});

module.exports = app;



