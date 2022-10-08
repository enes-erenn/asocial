const {
  addMessage,
  getAllMessages,
} = require("../controllers/chatController.js");
const router = require("express").Router();

router.post("/add", addMessage);
router.post("/get", getAllMessages);

module.exports = router;
