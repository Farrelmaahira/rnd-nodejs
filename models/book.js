'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Category, {
        through : 'category_book',
        as : {
          singular : 'category',
          plural : 'categories'
        },
        foreignKey : 'book_id',
        onDelete : 'cascade',
        onUpdate : 'cascade'
      });
    }
  }
  Book.init({
    book: DataTypes.STRING,
    picture : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};