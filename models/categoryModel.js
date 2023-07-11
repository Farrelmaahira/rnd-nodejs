const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('categories', {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        unique : true
    },

    cat_name : {
        type : Sequelize.STRING,
        allowNull : false 
    },

    createdAt : {
        field : 'created_at',
        type : Sequelize.DATE
    },

    updatedAt : {
        field : 'updated_at',
        type : Sequelize.DATE
    }
});

Category.hasMany('books', {
    as : 'categories'
});
module.exports = Category;