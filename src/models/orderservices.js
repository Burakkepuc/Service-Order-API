'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderServices.init({
    order_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderServices',
  });
  return OrderServices;
};