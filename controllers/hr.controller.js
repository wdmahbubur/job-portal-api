const Job = require('../services/job.service');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addNewJob = async (req, res) => {
    try {
        if (req.user.role !== 'hr' && req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'You are not allowed to post job'
            })
        }

        const document = {
            title: req.body.title,
            position: req.body.position,
            vacancy: req.body.vacancy,
            location: req.body.location,
            salary: req.body.salary,
            type: req.body.type,
            companyName: req.body.companyName,
            description: req.body.description,
            lastDate: new Date(req.body.lastDate),
            hr: {
                name: req.user.name,
                id: req.user._id
            }
        }

        const job = await Job.create(document);
        if (job) {
            res.status(201).json({ message: 'Job created successfully.' });
        }

    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })

    }
};

exports.getAllJobsByRequestingHR = async (req, res) => {
    try {
        if (req.user.role !== 'hr') {
            return res.status(403).json({ message: "You are not allowed to access this resources" });
        }
        const query = { "hr.id": req.user._id }
        const jobs = await Job.find(query);
        res.status(200).json({ jobs: jobs });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getJobByIDPostingByRequestingHR = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.role !== 'hr') {
            return res.status(403).json({ message: "You are not allowed to access this resources" });
        }
        const query = { _id: ObjectId(id), "hr.id": req.user._id };

        let job = await Job.findOne(query);
        job = await job.populate("applications", "-job");
        job = await job.populate("applications.candidate", "-_id name username email image");
        res.status(200).json(job);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.updateJob = async (req, res) => {
    try {
        const requestRole = req.user.role;
        if (requestRole !== "hr") {
            return res.status(403).json({
                message: "You are not allowed to access this action."
            });
        }

        const id = req.params.id;

        const query = { _id: ObjectId(id), "hr.id": req.user._id };

        const job = await Job.findOne(query);

        if (!job) {
            return res.status(403).json({
                message: "You are not posted this job."
            });
        }

        const update = await Job.update(id, req.body, { new: true });

        if (update) {
            res.status(200).json({
                message: "Job update successful",
            });
        } else {
            res.status(400).json({ message: "Job not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

