require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const pollController = require("./pollController");

const app = express();
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

// app.get("/", (req, res, next) => {
//   res.render("pollResult")
// });

app.get("/", pollController.getAllPolls);

app.get("/create", pollController.getCreatePoll);
app.post("/create", pollController.postCreatePoll);

app.get("/vote/:id", pollController.getPoll);
app.post("/vote/:id", pollController.postPoll)

app.get("/result/:id", pollController.getResult)

// app.get("result/:id", pollController.getResult)

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_SECRET_KEY}@cluster0.hf93u.mongodb.net/pollify`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
