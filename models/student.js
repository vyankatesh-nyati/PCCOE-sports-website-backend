const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    prn: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    indoor: {
      type: Array,
      default: [],
    },
    outdoor: {
      type: Array,
      default: [],
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);
