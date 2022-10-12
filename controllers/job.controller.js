const Job = require('../services/job.service');

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
        console.log(req.user);
        if (req.user.role !== 'hr') {
            return res.status(403).json({ message: "You are not allowed to access this resources" });
        }
        const query = { hr: { id: req.user._id } }
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