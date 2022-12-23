const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  indoor: {
    type: [],
    default: [],
  },
  outdoor: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model("sport", sportSchema);
