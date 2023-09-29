// const Cat = require('../models/categoryModel');
const { Book , Category, category_book } = require('../models');

const { responseData, responseMessage, responseError } = require('../utils/response-handler');

//GET ALL CATEGORY
exports.getAll = async (req, res) => {
    try {
        const data = await Category.findAll();
        if (data === 0) {
            responseMessage(res, 404, 'Data Kosong');
            return;
        }
        responseData(res, 200, data);
    } catch(err) {
        throw err 
    }
}

//POST NEW CATEGORY
exports.postData = async (req, res) => {
    try {
        const data = await Category.create({
            category : req.body.cat_name
        });
        responseData(res, 200, data);
    } catch (error) {
        responseError(res, 400, error.message);
    }
}

//GET CATEGORY BY ID
exports.getById = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await Category.findByPk(id, {
            include : [{
                model : Book,
                as : 'books'
            }]
        });
        if(data === null) {
            responseMessage(res, 404, 'Data tidak ditemukan');
            return;
        }
        responseData(res, 200, data);
    } catch (error) {
        responseError(res, 404, error);
    }
}

//UPDATE CATEGORY
exports.updateData = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await Category.update({
            category : req.body.cat_name
        }, {
            where: {
                id: id
            }
        });
        responseData(res, 200, data);
    } catch (error) {
        responseError(res, 400, error);
        return;
    }
}

//DELETE CATEGORY
exports.deleteData = async (req,res) => {
    let id = req.params.id;
    try {
        const data = await Category.findOne({
            where : {
                id : id
            }
        });
        if(data === 0) {
            responseMessage(res, 404, 'Data tidak ditemukan');
            return;
        }
        const book = await data.getBooks();
        console.log(await data.removeBooks(book));
        data.destroy();
        responseMessage(res, 200, 'Data berhasil dihapus');
    } catch (error) {
       responseError(res, 500, error.message); 
       return;
    } 
}

//GET CATEGORY WITH IT BOOKS
exports.getCategoyWithBook = async (req,res) => {
    let id = req.params.id;
   const data = await Category.findByPk(id, {
    include : [{
        model : Book,
        as : 'book'
    }]
   });
   responseData(res, 200, data);
}
