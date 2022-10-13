const router = require("express").Router();

const { getAllJobs, getJobById, applyJob, getHighestPaidJobs, getMostAppliedJobs } = require("../../controllers/candidate.controller");

const { verifyAccessToken } = require("../../middleware/user.middleware");
const UploadPDF = require("../../middleware/UploadPDF");

router.get("/jobs", getAllJobs);
router.get("/jobs/highest-paid-job", getHighestPaidJobs);
router.get("/jobs/highest-applied-job", getMostAppliedJobs);

router.get("/jobs/:id", getJobById);

router.post("/jobs/:id/apply", verifyAccessToken, UploadPDF.single("resume"), applyJob);


module.exports = router;
