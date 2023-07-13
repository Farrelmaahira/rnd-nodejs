const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'upload');
    },
    filename : (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}`);
    }
   
})

exports.upload = multer({
    storage : multerStorage
});
