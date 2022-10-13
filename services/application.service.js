const Application = require("../models/application.model");

const createApplication = async (document) => {
    try {
        const application = await Application.create(document);
        return application;
    } catch (err) {
        throw new Error(err.message.split(":")[2]);
    }
}
const find = async (query) => {
    try {
        const application = await Application.find(query).populate("job");
        return application;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const findOne = async (query) => {
    try {
        const application = await Application.findOne(query);
        return application;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    findOne, find, createApplication
}