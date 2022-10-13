const Job = require('../services/job.service');
const Application = require('../services/application.service');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllJobs = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort"];

        excludeFields.forEach(field => delete filters[field]);

        let options = {};

        if (req.query.sort) {
            const sort = req.query.sort.split(",").join(" ");
            options.sort = sort;
        }

        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filterString);
        const jobs = await Job.find(filters, options);
        res.status(200).json({ jobs: jobs });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getJobById = async (req, res) => {
    try {
        const id = req.params.id;

        let job = await Job.findOne({ _id: ObjectId(id) });
        job = await job.populate('hr.id', "-_id name username email image");
        res.status(200).json(job);

    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.applyJob = async (req, res) => {
    try {
        const id = req.params.id;

        const existApplication = await Application.findOne({ job: ObjectId(id), candidate: req.user._id });
        if (existApplication) {
            return res.status(403).json({ message: 'You already applied for this job.' });
        }

        let job = await Job.findOne({ _id: ObjectId(id) });
        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        if (job.status !== "available") {
            return res.status(404).send({ message: 'This job is not available not now.' });
        }

        if (new Date(job.lastDate) < new Date()) {
            return res.status(403).json({ message: "Application deadline is over." });
        }

        const resume = "public/resume/" + req.filename;

        const document = {
            candidate: req.user._id,
            job: id,
            resume: resume,
            expectedSalary: req.body.salary
        };

        const application = await Application.createApplication(document);

        const newApplicationsArr = [...job.applications, application._id];

        await Job.update(id, { applications: newApplicationsArr }, { new: true });

        res.status(201).json({ message: 'Your application has been submitted successfully.' });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getHighestPaidJobs = async (req, res) => {
    try {
        // get the highest paid jobs
        const filters = {};
        const options = { sort: { salary: -1 }, limit: 10 };

        const jobs = await Job.find(filters, options);
        res.status(200).json({ jobs: jobs });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getMostAppliedJobs = async (req, res) => {
    try {
        // get the highest applied jobs
        const filters = {};
        const options = { sort: { applications: -1 }, limit: 5 };

        const jobs = await Job.find(filters, options);
        res.status(200).json({ jobs: jobs });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}