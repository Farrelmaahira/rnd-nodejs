'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personal_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users);
    }
  }
  personal_token.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'personal_token',
  });
  return personal_token;
};