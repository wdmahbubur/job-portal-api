const Token = require("../models/token.model");

const create = async (document) => {
    try {
        const token = await Token.create(document);
        return token; document
    } catch (err) {
        throw new Error(err.message);
    }
}

const findOne = async (document) => {
    try {
        const token = await Token.findOne(document);
        return token;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    create, findOne
}