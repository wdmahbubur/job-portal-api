const Job = require("../models/job.model");

const create = async (document) => {
    try {
        const job = await Job.create(document);
        return job;
    } catch (err) {
        throw new Error(err.message.split(":")[2]);
    }
}

const find = async (query) => {
    try {
        console.log(query);
        const user = await Job.find(query);
        return user
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const findOne = async (document) => {
    try {
        const user = await Job.findOne(document);
        return user
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    create, find
}