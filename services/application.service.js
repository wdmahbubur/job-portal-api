const Application = require("../models/application.model");

const createApplication = async (document) => {
    try {
        const application = await Application.create(document);
        return application;
    } catch (err) {
        throw new Error(err.message.split(":")[2]);
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
    findOne, createApplication
}