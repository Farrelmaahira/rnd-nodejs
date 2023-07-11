const book = require('../models/book');
const { responseData, responseMessage, responseError } = require('../utils/response-handler');
//GET ALL BOOK
exports.getData = async (req,res) => {
    const data = await book.findAll();
    responseData(res, 200, data); 
}
//POST BOOK
exports.postData = async (req,res) => {
    try{
    const data = await book.create({
        category_id : req.body.cat_id,
        book : req.body.book
    });
    responseData(res, 200, data);
    } catch(err) {
        responseError(res, 400, err.message);
    }
}
//GET BOOK BY ID
exports.getById = async (req, res) => {
    let id = req.params.id;
    const data = await book.findByPk(id, {include : ['category']});
    responseData(res, 200, data);
}
//UPDATE BOOK
exports.updateData = async (req,res) => {
    let id = req.params.id;
    const data = await book.update({
        category_id : req.body.category_id,
        book : req.body.book
    }, {
        where : {
            id : id
        }
    });
    responseData(res, 200, data);
}
//DELETE BOOK
exports.deleteData = async (req, res) => {
    let id = req.params.id;
    const data = await book.destroy({
        where : {
            id : id
        }
    });
    responseData(res, 200, data);
    
}
//FILTER BOOKS BY CATEGORY
