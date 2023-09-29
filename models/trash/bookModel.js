const Sequelize = require('sequelize');

const sequelize = require('../config/db');

module.exports = function (sequelize, DataTypes) {
    let Book = sequelize.define('book', {
        book: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Book.associate = function(model){
        Book.belongsTo(model.category, {
            as : 'category',
            foreignKey : 'categoryId'
        });
    }
    return Book;
}


// const Book = sequelize.define('books', {
//     categoryId : {
//         type : Sequelize.INTEGER,
//         allowNull : false
//     },

//     book : {
//         type : Sequelize.STRING,
//         allowNull : false
//     }
// });

// Book.associate = function(model){
//     Book.belongsTo(model.categories, {
//         as : 'category',
//         foreignKey : 'categoryId'
//     });
// }
// module.exports = Book;
