const Job = require("../models/job.model");

const create = async (document) => {
    try {
        const job = await Job.create(document);
        return job;
    } catch (err) {
        throw new Error(err.message.split(":")[2]);
    }
}

const find = async (query, options) => {
    try {
        const jobs = await Job.find(query).sort(options?.sort);
        return jobs
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const findOne = async (query) => {
    try {
        const job = await Job.findOne(query);
        return job
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const update = async (id, document, options) => {
    try {
        const job = await Job.findByIdAndUpdate(id, document, options);
        return job
    }
    catch (err) {
        throw new Error(err.message.split(":")[2]);

    }
}

module.exports = {
    create, find, findOne, update
}