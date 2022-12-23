const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  bcrypt
    .hash(password, 12)
    .then((hashedPW) => {
      const admin = new Admin({
        name: name,
        email: email,
        password: hashedPW,
      });
      return admin.save();
    })
    .then((result) => {
      res.status(201).json({ adminId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadAdmin;

  Admin.findOne({ email: email })
    .then((admin) => {
      if (!admin) {
        const error = new Error("Email id doesn't exist!");
        error.statusCode = 401;
        throw error;
      }
      loadAdmin = admin;
      return bcrypt.compare(password, admin.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!!");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { email: loadAdmin.email, adminId: loadAdmin._id.toString() },
        "Thisismysecreatekeydonottellthiskeytoanyonevyankateshgayatriyashadityasiddhart",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        adminId: loadAdmin._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
