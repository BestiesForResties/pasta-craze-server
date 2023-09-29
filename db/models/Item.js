const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../db');

const Item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      }
});

module.exports = {
    Item
};