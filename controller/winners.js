const Sequelize = require("sequelize");
const db = require("../config/db");
const Winners = require("../models/winners");
const Countries = require("../models/countries");
const Sports = require("../models/sports");
const e = require("express");
const Op = Sequelize.Op;

Winners.belongsTo(Countries);
Winners.belongsTo(Sports);

exports.details = async (req, res) => {
  const id = req.params.id;

  Winners.findByPk(id)
    .then(data => {
      let response = {
        status: "success",
        message: "success get data",
        data: data,
      };
      res.json(response);
    })
    .catch(e => {
      let response = {
        status: "error",
        message: "something wrong"
      };
      res.json(response).status(500);
    })
}

exports.getWinners = async (req, res) => {
  const data = req.body;
  const filterModel = data.filterModel;
  const sortModel = data.sortModel;
  let sort = [];

  let sortOpt = {
    athlete: ["athlete"],
    age: ["age"],
    country_group: ["country_group"],
    year: ["year"],
    date: ["date"],
    gold: ["gold"],
    silver: ["silver"],
    bronze: ["bronze"],
    total: ["bronze"],
    "country.name": [Countries, "name"],
    "sport.name": [Sports, "name"],
  };

  if (sortModel && sortModel.length > 0) {
    sortModel.forEach((srt) => {
      let s = sortOpt[srt.colId];
      s.push(srt.sort.toUpperCase());
      sort.push(s);
    });
  }

  const ope = {
    equals: Op.eq,
    notEqual: Op.ne,
    lessThan: Op.lt,
    lessThanOrEqual: Op.lte,
    greaterThan: Op.gt,
    inRange: Op.between,
    AND: Op.and,
    OR: Op.or,
  };

  let filter = {};
  if (filterModel && filterModel.year) {
    if (ope[filterModel.year.type]) {
      if (filterModel && filterModel.year.type !== "inRange") {
        filter.year = {
          [ope[filterModel.year.type]]: filterModel.year.filter,
        };
      } else {
        filter.year = {
          [ope[filterModel.year.type]]: [
            filterModel.year.filter,
            filterModel.year.filterTo,
          ],
        };
      }
    }
  }

  if (filterModel && filterModel.date) {
    if (ope[filterModel.date.type]) {
      if (filterModel && filterModel.date.type !== "inRange") {
        filter.date = {
          [ope[filterModel.date.type]]: filterModel.date.dateFrom,
        };
      } else {
        filter.date = {
          [ope[filterModel.date.type]]: [
            filterModel.date.dateFrom,
            filterModel.date.dateTo,
          ],
        };
      }
    }
  }

  if (filterModel && filterModel.gold) {
    if (ope[filterModel.gold.type]) {
      if (filterModel && filterModel.gold.type !== "inRange") {
        filter.gold = {
          [ope[filterModel.gold.type]]: filterModel.gold.filter,
        };
      } else {
        filter.gold = {
          [ope[filterModel.gold.type]]: [
            filterModel.gold.filter,
            filterModel.gold.filterTo,
          ],
        };
      }
    }
  }

  if (filterModel && filterModel.silver) {
    if (ope[filterModel.silver.type]) {
      if (filterModel && filterModel.silver.type !== "inRange") {
        filter.silver = {
          [ope[filterModel.silver.type]]: filterModel.silver.filter,
        };
      } else {
        filter.silver = {
          [ope[filterModel.silver.type]]: [
            filterModel.silver.filter,
            filterModel.silver.filterTo,
          ],
        };
      }
    }
  }

  if (filterModel && filterModel.bronze) {
    if (ope[filterModel.bronze.type]) {
      if (filterModel && filterModel.bronze.type !== "inRange") {
        filter.bronze = {
          [ope[filterModel.bronze.type]]: filterModel.bronze.filter,
        };
      } else {
        filter.bronze = {
          [ope[filterModel.bronze.type]]: [
            filterModel.bronze.filter,
            filterModel.bronze.filterTo,
          ],
        };
      }
    }
  }

  Winners.findAndCountAll({
    offset: data.startRow ? data.startRow : 0,
    limit: data.endRow
      ? data.endRow - (data.startRow ? data.startRow : 0)
      : 100,
    include: [
      {
        model: Countries,
        as: "country",
        attributes: ["name"],
        where: {
          name: {
            [Op.or]:
              filterModel && filterModel["country.name"]
                ? filterModel["country.name"].values
                : [],
          },
        },
      },
      {
        model: Sports,
        as: "sport",
        attributes: ["name"],
        where: {
          name: {
            [Op.or]:
              filterModel && filterModel["sport.name"]
                ? filterModel["sport.name"].values
                : [],
          },
        },
      },
    ],
    where: filter,
    order: sort,
  })
    .then((data) => {
      let response = {
        status: "success",
        message: "success get data",
        data: {
          lastRow: data.count,
          rows: data.rows,
        },
      };
      res.json(response);
    })
    .catch((e) => {
      let response = {
        status: "error",
        message: "something wrong",
        data: null,
      };
      res.json(response).status(500);
    });
};

exports.addWinners = async (req, res) => {
  if (!req.body.athlete) {
    let response = {
      status: "error",
      message: "something wrong",
    };
    res.json(response).status(406);
    return;
  }

  let data = req.body;
  Winners.create(data)
    .then((data) => {
      let response = {
        status: "success",
        message: "data saved",
      };
      res.json(response).status(201);
    })
    .catch((e) => {
      let response = {
        status: "error",
        message: "something wroong",
      };
      res.json(response).status(406);
    });
};

exports.updateWinners = async (req, res) => {
  const id = req.params.id;

  Winners.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data) {
        let response = {
          status: "success",
          message: "data updated",
        };
        res.json(response).status(201);
      } else {
        let response = {
          status: "error",
          message: "something wroong",
        };
        res.json(response).status(406);
      }
    })
    .catch((e) => {
      let response = {
        status: "error",
        message: "something wroong",
      };
      res.json(response).status(406);
    });
};

exports.deleteWinners = async (req, res) => {
  const id = req.params.id;

  Winners.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data) {
        let response = {
          status: "success",
          message: "data deleted",
        };
        res.json(response).status(201);
      } else {
        let response = {
          status: "error",
          message: "something wroong",
        };
        res.json(response).status(406);
      }
    })
    .catch((e) => {
      let response = {
        status: "error",
        message: "something wroong",
      };
      res.json(response).status(406);
    });
};
