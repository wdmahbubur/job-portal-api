const router = require("express").Router();

const { signup, getUsers, getUserById, updateUserById, deleteUserById } = require("../../controllers/user.controller");

const upload = require("../../middleware/UploadImage");

router.post("/signup", upload.single("image"), signup);

// router.get("/", getUsers);
// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

// router.delete("/delete/:id", verifyAccessToken, deleteUserById);




module.exports = router;
