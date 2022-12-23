const express = require("express");

const isAuth = require("../middleware/is-auth");

const queriesController = require("../controllers/queries");

const router = express.Router();

router.get(
  "/:year/:department/:gender/:type/:game",
  isAuth,
  queriesController.queryData
);

module.exports = router;
