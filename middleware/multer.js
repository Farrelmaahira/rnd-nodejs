class AppError extends Error {
    constructor(message, statusCode) {
        super(message, statusCode)
        this.status = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); 
    }
}

const maxSize = 1 * 1000 * 1000;
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'upload');
    },
    filename : (req,file,cb) => {
        cb(null, `${file.originalname}`);
    },
   
})

let fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        return cb(null, true)
    }
    return cb(new AppError('Invalid file', 400))
}

exports.upload = multer({
    storage : multerStorage,
    limits : {
        fileSize : maxSize 
    },
    fileFilter : fileFilter
}).single('file');
