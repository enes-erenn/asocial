const {
  register,
  login,
  avatar,
  contacts,
} = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/avatar/:id", avatar);
router.get("/contacts/:id", contacts);

module.exports = router;
