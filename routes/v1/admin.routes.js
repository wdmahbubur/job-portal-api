const router = require("express").Router();

const { updateUserToHR, getAllCandidate, getUserById, getAllHR } = require("../../controllers/admin.controller");

const { verifyAccessToken } = require("../../middleware/user.middleware");

router.patch("/role-update/:id", verifyAccessToken, updateUserToHR);
router.get("/get-all-candidate", verifyAccessToken, getAllCandidate);
router.get("/get-all-hr", verifyAccessToken, getAllHR);

router.get("/:id", verifyAccessToken, getUserById);

module.exports = router;
