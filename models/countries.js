const Sequelize = require("sequelize");
const db = require("../config/db");
const Winners = require('./winners');

const { DataTypes } = Sequelize;

const Countries = db.define("countries", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
}, {
  timestamps: false
});

Countries.has

module.exports = Countries;