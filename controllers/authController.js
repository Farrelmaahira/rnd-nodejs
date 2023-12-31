const bcrypt = require('bcrypt');

const { Users } = require('../models/index');

const Joi = require('joi');

const { responseError, responseData } = require('../utils/response-handler');

const jwt = require('jsonwebtoken');

const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

var validate = (data, c) => {
    let schema;
    switch (c) {
        case 'signin':
            schema = Joi.object({
                email : Joi.string().email().required(),
                password : Joi.string().min(8).required()
            });
            return schema.validate(data);
            break;
        case 'signup':
            schema = Joi.object({
               username : Joi.string().required(),
               email : Joi.string().email().required(),
               password : Joi.string().min(8).required() 
            }); 
            return schema.validate(data);
            break;
    }
}

exports.pasSignup =  (req,res) => {
    responseData(res, 200, res.user);
}

exports.userSignup = async (req, res) => {
    const dataValidate = {};

    const username = req.body.username;

    const password = req.body.password;

    const email = req.body.email;

    dataValidate.username = username;
    dataValidate.password = password;
    dataValidate.email = email;

    const val = validate(dataValidate, 'signup');

    try {
        if (val.error) throw val.error.details[0];

        const data = await Users.count({
            where: {
                email: email
            }
        });

        if (data == 0) {

            const hashPassword = await bcrypt.hash(password, 10);
            const auth = await Users.create({
                username: username,
                password: hashPassword,
                email: email
            });
            return responseData(res, 200, auth);

        } else {
            return responseError(res, 400, 'Email sudah digunakan');
        }

    } catch (error) {
        responseError(res, 400 || 500, error.message)
    }
}

exports.userSignin = async (req, res) => {
    const dataValidate = {}

    const email = req.body.email;

    const password = req.body.password;

    dataValidate.email = email;
    dataValidate.password = password
    
    const val = validate(dataValidate, 'signin');

    try {

        if (val.error) throw val.error.details[0];

        const data = await Users.findOne({
            where : {
                email : email
            }
        });

        if(!data) return  responseError(res, 400, 'Email atau password yang anda masukan salah');

        const compare = await bcrypt.compare(password, data.password);
        if(compare == false) {

            return responseError(res, 400, 'Email atau anda yang masukan salah');

        } else {

            const payload = {
                id : data.id,
                username : data.username,
                email : data.email
            }

            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
                expiresIn : 3600
            });

            const response = {
                user : data,
                token : token
            }
            return responseData(res, 200, response);
        }

    } catch (error) {
        responseError(res, 400, error.message);
    }
}
