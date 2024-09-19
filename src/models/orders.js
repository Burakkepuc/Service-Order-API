'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users, { foreignKey: 'user_id' })
      Orders.belongsToMany(models.Services, { through: 'OrderServices', foreignKey: 'order_id' });

    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    details: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};