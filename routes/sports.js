const express = require("express");
const { body } = require("express-validator");

const sportsController = require("../controllers/sports");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST  /sports/create
router.post("/create", isAuth, sportsController.create);

// POST /sports/add
router.post(
  "/add",
  isAuth,
  [
    body("type").trim().not().isEmpty().withMessage("Please enter valid type"),
    body("name").trim().not().isEmpty().withMessage("Please enter valid name"),
  ],
  sportsController.add
);

// POST /sports/remove
router.post(
  "/remove",
  isAuth,
  [body("name").trim().not().isEmpty().withMessage("Please enter valid name")],
  sportsController.remove
);

// GET /sports/fetch
router.get("/fetch", isAuth, sportsController.fetch)

module.exports = router;
