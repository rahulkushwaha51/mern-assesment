const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Adjust the path as necessary

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: { // Ensure this matches your database column name
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: { // Ensure this matches your database column name
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Make code the primary key
  },
  gender: {
    type: DataTypes.STRING, // Change to STRING to match your manual DB setup
    allowNull: false,
    validate: {
      isIn: [['male', 'female', 'other']], // Validate gender
    },
    registered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
});

module.exports = User;
