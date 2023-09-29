const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Cart = sequelize.define('cart', {
  cartStatus: { type: DataTypes.ENUM, 
    values: ['open', 'closed'],
    allowNull: false,
    defaultValue: 'open',
  }
});

module.exports = {
    Cart
};