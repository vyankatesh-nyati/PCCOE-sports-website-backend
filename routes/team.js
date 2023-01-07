const express = require("express");
const { body } = require("express-validator");
const teamController = require("../controllers/team");
const isAuth = require("../middleware/is-auth");
const Team = require("../models/team");

const router = express.Router();

// CREATE TEAM /team/create-team
router.post(
  "/create-team",
  isAuth,
  [
    body("teamName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Enter valid team name")
      .custom((value, { req }) => {
        return Team.findOne({ teamName: value }).then((result) => {
          if (result) {
            return Promise.reject("Team already exists!!!");
          }
        });
      }),
  ],
  teamController.createTeam
);

// UPDATE TEAM /team/:teamId
router.post(
  "/:teamId",
  isAuth,
  [
    body("teamName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Enter valid team name (non empty)!!!")
      .custom((value, { req }) => {
        return Team.findOne({ teamName: value }).then((result) => {
          if (result && req.params.teamId != result._id) {
            return Promise.reject("Team already exists!!!");
          }
        });
      }),
  ],
  teamController.updateTeam
);

// READ TEAM DATA /team/get-teams
router.get("/get-teams", isAuth, teamController.getTeams);

// DELETE TEAM /team/:teamId
router.delete("/:teamId", isAuth, teamController.deleteTeam);

// ADD PLAYER /team/add-player/:teamId
router.put("/add-player/:teamId", isAuth, teamController.addPlayer);

// REMOVE PLAYER /team/:teamId/:playerId
router.put("/remove-player/:teamId", isAuth, teamController.removePlayer);

module.exports = router;
