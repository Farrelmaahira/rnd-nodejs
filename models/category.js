'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Book, {
        through : 'category_book',
        as : {
          singular : 'book',
          plural : 'books'
        },
        foreignKey : 'category_id',
        onDelete : 'cascade',
        onUpdate : 'cascade'
      });
    }
  }
  Category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};