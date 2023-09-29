const { Sequelize, DataTypes} = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});


module.exports = { sequelize, DataTypes };