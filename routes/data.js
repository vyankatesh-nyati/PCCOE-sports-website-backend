const express = require("express");

const isAuth = require("../middleware/is-auth");

const dataController = require("../controllers/data");

const router = express.Router();

// GET  /data
router.get("/data", isAuth, dataController.getData);

module.exports = router;
