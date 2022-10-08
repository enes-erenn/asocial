const Chat = require("../models/chatModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Chat.create({
      message,
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({
        status: "success",
        message: "Message added successfully",
      });
    }

    return res.json({
      status: "fail",
      message: "Message is not added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "fail",
      message: "Something went wrong",
      error: err.message,
    });
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const chat = await Chat.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectChat = chat.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });

    res.json({ status: "success", chat: projectChat });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "fail",
      message: "Something went wrong",
      error: err.message,
    });
  }
};
