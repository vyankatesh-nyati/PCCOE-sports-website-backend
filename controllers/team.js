const { validationResult } = require("express-validator");
const Team = require("../models/team");

exports.createTeam = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const teamName = req.body.teamName;

  try {
    const team = new Team({
      teamName: teamName,
      squad: [],
    });
    const result = await team.save();
    res.status(200).json({
      teamId: result._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateTeam = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation Failed!!!");
    err.statusCode = 422;
    err.data = errors.array();
    next(err);
  }
  const teamId = req.params.teamId;
  const teamName = req.body.teamName;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      const error = new Error("team doesn't exists!!!");
      error.statusCode = 404;
      throw error;
    }
    team.teamName = teamName;
    const result = await team.save();
    res.status(200).json({
      message: "Team data updated successfully",
      team: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const data = await Team.find().populate("squad");
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTeam = async (req, res, next) => {
  const teamId = req.params.teamId;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      const err = new Error("Team not found!!!");
      err.statusCode = 404;
      throw err;
    }
    const result = await Team.findByIdAndRemove(teamId);
    res.status(200).json({
      message: "team deleted successfully.",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addPlayer = async (req, res, next) => {
  const squad = req.body.squad;
  const teamId = req.params.teamId;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      const err = new Error("Team not found!!!");
      err.statusCode = 404;
      throw err;
    }
    let teamSquad = team.squad;
    teamSquad = teamSquad.concat(squad);
    for (var i = 0; i < teamSquad.length; i++) {
      for (var j = i + 1; j < teamSquad.length; j++) {
        if (teamSquad[i] == teamSquad[j]) {
          teamSquad.splice(j, 1);
        }
      }
    }
    team.squad = teamSquad;
    const result = await team.save();
    res.status(200).json({
      message: "Player added Successfully.",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.removePlayer = async (req, res, next) => {
  const teamId = req.params.teamId;
  const playerId = req.body.playerId;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      const err = new Error("Team not found!!!");
      err.statusCode = 404;
      throw err;
    }
    const check = team.squad.includes(playerId);
    if (!check) {
      const err = new Error("Player not found in team!!!");
      err.statusCode = 404;
      throw err;
    }
    const result = await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { squad: playerId } }
    );
    res.status(200).json({
      message: "Player removed successfuly from team.",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
