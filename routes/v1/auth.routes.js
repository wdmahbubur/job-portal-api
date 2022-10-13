const router = require("express").Router();

const { signup, login, getLoggedUser } = require("../../controllers/auth.controller");

const UploadImage = require("../../middleware/UploadImage");
const { verifyAccessToken } = require("../../middleware/user.middleware");

router.post("/signup", UploadImage.single("image"), signup);
router.post("/login", login);
router.get("/me", verifyAccessToken, getLoggedUser);


module.exports = router;
