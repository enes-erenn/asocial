const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

const app = express();
dotenv.config({ path: ".env.local" });

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/chat", chatRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("asocial backend is now running on port " + process.env.PORT);
});
