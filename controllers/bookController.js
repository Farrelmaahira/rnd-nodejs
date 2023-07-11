const { Book, Category } = require('../models');

const { responseData, responseMessage, responseError } = require('../utils/response-handler');

//GET ALL BOOK
exports.getData = async (req,res) => {
    const data = await Book.findAll({
        include : [{
            model : Category,
            as : 'category'
        }]
    });
    responseData(res, 200, data); 
}
//POST BOOK
exports.postData = async (req,res) => {
    try{
    const data = await Book.create({
        categoryId : req.body.cat_id,
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
    const data = await Book.findOne({
        where : {
            id : id
        },
    });
    responseData(res, 200, data);
}
//UPDATE BOOK
exports.updateData = async (req,res) => {
    let id = req.params.id;
    const data = await Book.update({
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
    const data = await Book.destroy({
        where : {
            id : id
        }
    });
    responseData(res, 200, data);
    
}
//FILTER BOOKS BY CATEGORY
exports.getCategoryBook = async (req,res) => {
    try {
        let id = req.params
        console.log(id);
        const data = await book.findAll({
            include : [{
                model : Category,
                as : 'category'
            }]
        });
        if(data == 0){
            responseData(res, 404, 'Data tidak ditemukan');
        }
        responseData(res, 200, data);
    } catch(err) {
        responseError(res, 404 || 500, err);
    }
   
}