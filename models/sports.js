const Sequelize = require("sequelize");
const db = require("../config/db");

const { DataTypes } = Sequelize;

const Sports = db.define("sports", {
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

module.exports = Sports;