const express = require("express");
const { body } = require("express-validator");

const studentController = require("../controllers/student");

const Student = require("../models/student");

const router = express.Router();

// POST  /student/signup
router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid first name"),
    body("middleName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid middle name"),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid last name"),
    body("email")
      .isEmail()
      .withMessage("Please Enter valid email")
      .custom((value, { req }) => {
        return Student.findOne({ email: value }).then((foundStudent) => {
          if (foundStudent) {
            return Promise.reject(
              "Email id already exists! Please enter valid email."
            );
          }
        });
      }),
    body("phone")
      .isLength({ min: 0, max: 10 })
      .withMessage("Please enter valid phone number")
      .custom((value, { req }) => {
        return Student.findOne({ phone: value }).then((foundNumber) => {
          if (foundNumber) {
            return Promise.reject("Phone number already exists!");
          }
        });
      }),
    body("prn")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid prn number!")
      .custom((value, { req }) => {
        return Student.findOne({ prn: value }).then((findPrn) => {
          if (findPrn) {
            return Promise.reject("Prn already exists!");
          }
        });
      }),
    body("department")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid department name!"),
    body("division")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid division name!"),
    body("gender")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter valid gender!"),
  ],
  studentController.signup
);

module.exports = router;
