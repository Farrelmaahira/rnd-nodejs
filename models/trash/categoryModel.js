const Sequelize = require('sequelize');

const sequelize = require('../config/db');

const Book = require('./bookModel');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
            unique : true
        },
    
        cat_name : {
            type : DataTypes.STRING,
            allowNull : false 
        },
    
        createdAt : {
            field : 'created_at',
            type : DataTypes.DATE
        },
    
        updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE
        }
    });

    Category.associate = function(model) {
        Category.hasMany(model.book,{
            as : 'books'
        });
    }
    
}



