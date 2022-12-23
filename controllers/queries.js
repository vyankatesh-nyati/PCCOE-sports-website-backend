const _ = require("lodash");

const Student = require("../models/student");

exports.getYearData = async (req, res, next) => {
  const year = req.params.year;
  const department = _.kebabCase(_.capitalize(req.params.department));

  try {
    if (department === "all") {
      const response = await Student.find({ year: year });
      res.status(200).json({
        data: response,
      });
    } else {
      const response = await Student.find({
        year: year,
        department: department,
      });
      res.status(200).json({
        data: response,
      });
    }
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
