const Sequelize = require("sequelize");
const db = require("../config/db");

const Countries = require('./countries');
const Sports = require('./sports');

const { DataTypes } = Sequelize;

const Winners = db.define("olympic_winners", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  athlete: {
    type: DataTypes.STRING(20)
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
  countryId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Countries,
      key: 'id'
    },
    validate: {
      isNumeric: true,
    }
  },
  country_group: {
    type: DataTypes.STRING(2)
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
  date: {
    type: DataTypes.DATE,
    validate: {
      isDate: true,
    }
  },
  sportId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Sports,
      key: 'id'
    },
    validate: {
      isNumeric: true,
    }
  },
  gold: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
  silver: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
  bronze: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
  total: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
    }
  },
}, {
  timestamps: false
});

module.exports = Winners;