const router = require("express").Router();

const { addNewJob, getAllJobsByRequestingHR, getJobByIDPostingByRequestingHR, updateJob } = require("../../controllers/hr.controller");

const { verifyAccessToken } = require("../../middleware/user.middleware");

router.post("/jobs", verifyAccessToken, addNewJob);
router.get("/manager/jobs", verifyAccessToken, getAllJobsByRequestingHR);
router.get("/manager/jobs/:id", verifyAccessToken, getJobByIDPostingByRequestingHR);

router.route("/jobs/:id").patch(verifyAccessToken, updateJob);



module.exports = router;
