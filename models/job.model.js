const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    position: {
        type: String,
        required: [true, "Position is required"],
    },
    vacancy: {
        type: Number,
        required: [true, "vacancy is required"],
        validate: {
            validator: (value) => value < 1 ? false : true,
            message: "Minimum 1 vacancy is required",
        },
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: {
            values: ["On-Site", "Remote", "Hybrid"],
            message: "There are three types of job is available On-Site, Remote and Hybrid.",
        }
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    lastDate: {
        type: Date,
        required: [true, "Last apply date is required"],
    },
    hr: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        }
    },
    applications: {
        type: [mongoose.Schema.ObjectId],
        ref: 'application',
    },
    status: {
        type: String,
        default: "available",
        enum: ["available", "not available"],
    },

}, {
    timestamps: true
});

const model = mongoose.model("Job", jobSchema);
module.exports = model;