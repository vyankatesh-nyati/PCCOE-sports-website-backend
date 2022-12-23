const _ = require("lodash");

const Student = require("../models/student");
const Sport = require("../models/sport");

exports.queryData = async (req, res, next) => {
  const year = req.params.year;
  const department = _.kebabCase(_.capitalize(req.params.department));
  const gender = _.capitalize(req.params.gender);
  const type = _.kebabCase(req.params.type);
  const game = _.kebabCase(req.params.game);

  try {
    let response = await Student.find({});
    // console.log(response);

    if (year != "all") {
      response = response.filter((result) => result.year === Number(year));
    }

    if (department != "all") {
      response = response.filter((result) => result.department === department);
    }

    if (gender != "all") {
      response = response.filter((result) => result.gender == gender);
    }

    if (type != "all") {
      if (type === "indoor") {
        response = response.filter((result) => result.indoor.length > 0);
      } else {
        response = response.filter((result) => result.outdoor.length > 0);
      }
    }

    if (game != "all") {
      response = response.filter(
        (result) =>
          result.indoor.includes(game) === true ||
          result.indoor.includes(game) === true
      );
    }

    // console.log(response);
    res.status(200).json({ data: response });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
