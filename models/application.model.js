const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required: true,
    },
    resume: {
        type: String,
    },
    expectedSalary: {
        type: Number,
        required: [true, "ExpectedSalary is required"],
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "interview", "assessment", "hired", "reject"],
    },

}, {
    timestamps: true
});

const model = mongoose.model("Application", applicationSchema);
module.exports = model;