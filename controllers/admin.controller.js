const User = require("../services/user.service");

const Application = require("../services/application.service");
const ObjectId = require('mongoose').Types.ObjectId;

exports.updateUserToHR = async (req, res) => {
    try {
        const requestRole = req.user.role;
        if (requestRole !== "admin") {
            return res.status(403).json({
                message: "You are not allowed to access this action."
            });
        }

        const id = req.params.id;

        const update = await User.update(id, { role: 'hr' }, { new: true });

        if (update) {
            res.status(200).json({
                message: "User role update successful",
            });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllCandidate = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to access this resources' });
        }

        const query = { role: 'user' };
        const candidates = await User.gets(query);
        res.status(200).json({
            candidates
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to access this resources' });
        }
        const id = req.params.id;
        const user = await User.getById(id);
        const applications = await Application.find({ candidate: ObjectId(id) });

        res.status(200).json({
            user, applications
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getAllHR = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to access this resources' });
        }

        const query = { role: 'hr' };
        const hr = await User.gets(query);
        res.status(200).json({
            hr
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}
