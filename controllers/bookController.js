const { Book, Category, category_book } = require('../models')

const {
  responseData,
  responseMessage,
  responseError,
} = require('../utils/response-handler')

const Joi = require('joi')

const { upload } = require('../middleware/multer')

var validate = (data) => {
  let schema = Joi.object({
    book: Joi.string().required(),
    cat: Joi.number(),
  })

  return schema.validate(data)
}

//GET ALL BOOK
exports.getData = async (req, res) => {
  try {
    const data = await Book.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
        },
      ],
    })
    responseData(res, 200, data)
  } catch (err) {
    console.log(err)
  }
}

//POST BOOK
exports.postData = async (req, res) => {
  const book = req.body.book
  const catId = req.body.cat
  const dataValidate = {}
  dataValidate.book = book
  dataValidate.cat = catId

  try {
    const val = validate(dataValidate)

    if (val.error) throw new Error(val.error.details[0].message)

    // console.log(req.file);
    let bookData = { book }
    if (req.file) bookData.picture = req.file.originalname

    const data = await Book.create(bookData)

    await data.addCategories(catId)

    responseData(res, 200, data)
  } catch (err) {
    responseError(res, 400, err.message)
  }
}

//GET BOOK BY ID
exports.getById = async (req, res) => {
  try {
    let id = req.params.id
    const data = await Book.findOne({
      where: {
        id: id,
      },
      include: {
        model: Category,
        as: 'categories',
      },
    })
    if (data === null) {
      return responseMessage(res, 404, 'Data tidak ditemukan')
    }
    responseData(res, 200, data)
  } catch (err) {
    console.log(err)
  }
}

//UPDATE BOOK
exports.updateData = async (req, res) => {
  let book = req.body.book
  let catId = req.body.cat
  let id = req.params.id
  try {
    const data = await Book.findOne({
      where: {
        id: id,
      },
      include: {
        model: Category,
        as: 'categories',
      },
    })

    await data.update({
      book: book,
    })

    await data.addCategories(catId)

    responseData(res, 200, data)
  } catch (err) {
    console.log(err)
  }
}

//DELETE BOOK
exports.deleteData = async (req, res) => {
  let id = req.params.id

  try {
    const book = await Book.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Category,
          as: 'categories',
        },
      ],
    })
    const catId = await book.getCategories()
    await book.removeCategories(catId)
    await book.destroy()
    responseData(res, 200, book)
  } catch (err) {
    console.log(err)
  }
}

//REMOVE CATEGORY
exports.removeCategory = async (req, res) => {
  let id = req.params.id
  let catId = req.body.cat
  try {
    console.log(catId)
    const data = await Book.findByPk(id)
    await data.removeCategory(catId)
    responseMessage(res, 200, 'Category berhasil dihapus dari buku')
  } catch (error) {
    console.log('error', error.message)
  }
}
