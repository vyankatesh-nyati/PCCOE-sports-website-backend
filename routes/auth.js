const express = require("express");
const { body } = require("express-validator");

const Admin = require("../models/admin");
const isAuth = require("../middleware/is-auth");

const authController = require("../controllers/auth");

const router = express.Router();

// POST  /auth/signup
router.post(
  "/signup",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        return Admin.findOne({ email: value }).then((adminResult) => {
          if (adminResult) {
            return Promise.reject("Email already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter valid password (length > 5)!"),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password and confirm password are not matching!");
        }
        return true;
      }),
    body("name").trim().not().isEmpty().withMessage("Please enter valid name!"),
  ],
  authController.signup
);

// POST  /auth/login
router.post("/login", authController.login);

module.exports = router;
