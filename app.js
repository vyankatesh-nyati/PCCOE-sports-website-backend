const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// all routes related paths
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const studentRoutes = require("./routes/student");
const queriesRoutes = require("./routes/queries");

const app = express();

mongoose.set("strictQuery", false);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// all routes are initialised here
app.use("/auth", authRoutes);
app.use("/", dataRoutes);
app.use("/student", studentRoutes);
app.use("/query", queriesRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/sports")
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    const error = new Error("Problem with mongodb connection!");
    error.statusCode = 500;
    next(error);
  });
