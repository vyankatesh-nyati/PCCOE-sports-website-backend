const Student = require("../models/student");

exports.getData = async (req, res, next) => {
  try {
    const result = await Student.find({});
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    const err = new Error(error);
    err.statusCode = 500;
    throw err;
  }
};
