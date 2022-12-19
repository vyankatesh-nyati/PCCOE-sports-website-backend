const { validationResult } = require("express-validator");
const Student = require("../models/student");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const prn = req.body.prn;
  const department = req.body.department;
  const division = req.body.division;
  const gender = req.body.gender;
  const indoor = req.body.indoor;
  const outdoor = req.body.outdoor;
  const name = firstName + " " + middleName + " " + lastName;

  const student = new Student({
    name: name,
    email: email,
    phone: phone,
    prn: prn,
    department: department,
    division: division,
    gender: gender,
    indoor: indoor,
    outdoor: outdoor,
  });

  student
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Signup successfully.", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
