const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const app = express();
const socket = require("socket.io");
dotenv.config({ path: ".env.local" });

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: `https://asocial-chat-app.herokuapp.com/`,
    exposedHeaders: "*",
  })
);
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

const io = socket(server, {
  cors: {
    origin: "https://asocial.vercel.app/",
    credantials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message-recieve", data.message);
    }
  });
});
