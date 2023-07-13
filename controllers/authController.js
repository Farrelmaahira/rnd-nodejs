const { Users } = require('../models');

const {responseData} = require('../utils/response-handler');

exports.getUser = async (req,res) => {
    const data = await Users.findAll();
    responseData(res, 200, data);
}

exports.login = async (req,res) => {
    let email = req.body.email;
    let pass = req.body.pass;


}
