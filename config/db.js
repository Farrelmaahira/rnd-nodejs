const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '',
    database: 'library'
});

connection.connect(function(err){
    if(err) {
        throw err
    } else {
        console.log('connected')
    }
}); 

module.exports = connection;