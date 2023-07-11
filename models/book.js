const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Book = sequelize.define('books', {
    category_id : {
        type : Sequelize.INTEGER,
        allowNull : false 
    }, 

    book : {
        type : Sequelize.STRING,
        allowNull : false
    },

    createdAt : {
        field : 'created_at',
        type: Sequelize.DATE
    },
    
    updatedAt : {
        field : 'updated_at',
        type : Sequelize.DATE,
    }
});
Book.belongsTo('categories', {
    foreignKey: 'category_id',
    as : 'books'
});
module.exports = Book;