const router = require("express").Router();

const { signup, login, getLoggedUser, updateUserToHR, getAllCandidate, getUserById, getAllHR, deleteUserById } = require("../../controllers/user.controller");

const UploadImage = require("../../middleware/UploadImage");
const { verifyAccessToken } = require("../../middleware/user.middleware");

router.post("/signup", UploadImage.single("image"), signup);
router.post("/login", login);
router.get("/me", verifyAccessToken, getLoggedUser);
router.patch("/role-update/:id", verifyAccessToken, updateUserToHR);
router.get("/get-all-candidate", verifyAccessToken, getAllCandidate);
router.get("/get-all-hr", verifyAccessToken, getAllHR);

router.get("/:id", verifyAccessToken, getUserById);





module.exports = router;
