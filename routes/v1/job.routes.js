const router = require("express").Router();

const { addNewJob, getAllJobsByRequestingHR } = require("../../controllers/job.controller");

const { verifyAccessToken } = require("../../middleware/user.middleware");

router.post("/jobs", verifyAccessToken, addNewJob);
router.get("/manager/jobs", verifyAccessToken, getAllJobsByRequestingHR);

// router.get("/", getUsers);
// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

// router.delete("/delete/:id", verifyAccessToken, deleteUserById);




module.exports = router;
