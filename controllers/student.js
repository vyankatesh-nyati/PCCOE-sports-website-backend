const _ = require("lodash");
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
  const department = _.kebabCase(req.body.department);
  const division = req.body.division;
  const gender = req.body.gender;
  const indoor = req.body.indoor;
  const outdoor = req.body.outdoor;
  const name = firstName + " " + middleName + " " + lastName;
  const year = new Date().getFullYear();

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
    year: year,
  });

  student
    .save()
    .then((result) => {
      res.status(201).json({ userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateStudent = (req, res, next) => {
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
  const department = _.kebabCase(req.body.department);
  const division = req.body.division;
  const gender = req.body.gender;
  const indoor = req.body.indoor;
  const outdoor = req.body.outdoor;
  const name = firstName + " " + middleName + " " + lastName;
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .then((student) => {
      if (!student) {
        const error = new Error("Could not find student.");
        error.statusCode = 404;
        throw error;
      }
      student.email = email;
      student.phone = phone;
      student.prn = prn;
      student.department = department;
      student.division = division;
      student.gender = gender;
      student.indoor = indoor;
      student.outdoor = outdoor;
      student.name = name;
      return student.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Student data updated succefully!",
        studentData: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then((student) => {
      if (!student) {
        const error = new Error("Could not find student.");
        error.statusCode = 404;
        throw error;
      }
      return Student.findByIdAndRemove(studentId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Student deleted!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
