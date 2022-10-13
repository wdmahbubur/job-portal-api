const router = require("express").Router();

const { signup, login, getLoggedUser, updateUserToHR, getUsers, getUserById, updateUserById, deleteUserById } = require("../../controllers/user.controller");

const UploadImage = require("../../middleware/UploadImage");
const { verifyAccessToken } = require("../../middleware/user.middleware");

router.post("/signup", UploadImage.single("image"), signup);
router.post("/login", login);
router.get("/me", verifyAccessToken, getLoggedUser);
router.patch("/role-update/:id", verifyAccessToken, updateUserToHR);

// router.get("/", getUsers);
// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

// router.delete("/delete/:id", verifyAccessToken, deleteUserById);




module.exports = router;
