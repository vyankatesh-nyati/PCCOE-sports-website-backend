const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    squad: [{ type: Schema.Types.ObjectId, ref: "Students" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("team", teamSchema);
