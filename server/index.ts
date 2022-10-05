const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: ".env.local" });

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err: Error) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Asocial backend is now running on port " + process.env.PORT);
});
