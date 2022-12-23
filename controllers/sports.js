const { validationResult } = require("express-validator");

const Sport = require("../models/sport");

exports.create = (req, res, next) => {
  const sport = new Sport({
    indoor: [],
    outdoor: [],
  });

  sport
    .save()
    .then((result) => {
      res.status(201).json({ id: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.add = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const type = req.body.type;
  const name = req.body.name;

  try {
    const result = await Sport.find({});
    let loadedId;
    let indoorGames = [];
    let outdoorGames = [];

    if (result.length > 0) {
      loadedId = result[0]._id;
      indoorGames = result[0].indoor;
      outdoorGames = result[0].outdoor;
    } else {
      const err = new Error("No element present");
      err.statusCode = 500;
      throw err;
    }

    if (loadedId) {
      if (type === "indoor") {
        const isPresent = indoorGames.includes(name);
        if (!isPresent) {
          const response = await Sport.updateOne(
            { _id: loadedId },
            { $push: { indoor: name } }
          );
        }
      }

      if (type === "outdoor") {
        const isPresent = outdoorGames.includes(name);
        if (!isPresent) {
          const response = await Sport.updateOne(
            { _id: loadedId },
            { $push: { outdoor: name } }
          );
        }
      }

      res.status(201).json({ message: "Game Added Successfully." });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const name = req.body.name;

  try {
    const result = await Sport.find({});
    let loadedId;
    let indoorGames = [];
    let outdoorGames = [];

    if (result.length > 0) {
      loadedId = result[0]._id;
      indoorGames = result[0].indoor;
      outdoorGames = result[0].outdoor;
    } else {
      const err = new Error("No element present");
      err.statusCode = 500;
      throw err;
    }

    indoorGames.remove(name);
    outdoorGames.remove(name);

    if (loadedId) {
      await Sport.findOneAndUpdate(
        { _id: loadedId },
        { indoor: indoorGames, outdoor: outdoorGames }
      );
    }

    res.status(201).json({ message: "Game removed Successfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.fetch = async (req, res, next) => {
  try {
    const response = await Sport.find({});
    if (response.length > 0) {
      res.status(200).json({
        data: response[0],
      });
    } else {
      const err = new Error("No elments present");
      err.statusCode = 500;
      throw err;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
