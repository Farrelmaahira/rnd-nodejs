const db = require('../config/db');
const { responseData, responseMessage } = require('../utils/response-handler');

exports.getData = (req,res) => {
    db.query('SELECT * FROM books', function(err, result){
        if(err) throw err
        responseData(res, 200, result );
    });
}
