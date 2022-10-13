const router = require("express").Router();

const { addNewJob, getAllJobsByRequestingHR, getJobByIDPostingByRequestingHR, updateJob, getAllJobs, getJobById, applyJob, getHighestPaidJobs, getMostAppliedJobs } = require("../../controllers/job.controller");

const { verifyAccessToken } = require("../../middleware/user.middleware");
const UploadPDF = require("../../middleware/UploadPDF");

router.route("/jobs").post(verifyAccessToken, addNewJob).get(getAllJobs);
router.get("/manager/jobs", verifyAccessToken, getAllJobsByRequestingHR);
router.get("/manager/jobs/:id", verifyAccessToken, getJobByIDPostingByRequestingHR);
router.get("/jobs/highest-paid-job", getHighestPaidJobs);
router.get("/jobs/highest-applied-job", getMostAppliedJobs);

router.route("/jobs/:id").patch(verifyAccessToken, updateJob).get(getJobById);

router.post("/jobs/:id/apply", verifyAccessToken, UploadPDF.single("resume"), applyJob);





// router.get("/", getUsers);
// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

// router.delete("/delete/:id", verifyAccessToken, deleteUserById);




module.exports = router;
