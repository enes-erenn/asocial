const { register } = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/register", register);

module.exports = router;
