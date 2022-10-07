const { register, login, avatar } = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/avatar/:id", avatar);

module.exports = router;
