const User = require("../models/user.model");

const create = async (document) => {
    try {
        const newUser = new User(document);
        const result = await newUser.save();
        return result;
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyValue?.username) {
                throw Error("Username already exist");
            }
            if (err.keyValue?.email) {
                throw Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

const findOne = async (document) => {
    try {
        const user = await User.findOne(document);
        return user
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const gets = async (query) => {
    try {
        const users = await User.find(query).select('-password');
        return users
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const getById = async (id) => {
    try {
        const user = await User.findById(id).select("-password");
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

const update = async (id, document, options) => {
    try {
        const update = await User.findByIdAndUpdate(id, document, options);
        return update
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            if (err.keyValue?.username) {
                throw new Error("Username already exist");
            }
            if (err.keyValue?.email) {
                throw new Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

// const remove = async (id) => {
//     try {
//         const user = await User.findByIdAndDelete(id);
//         return user
//     }
//     catch (err) {
//         console.log(err);
//         throw new Error(err.message.split(":")[2]);

//     }
// }

module.exports = {
    create,
    findOne,
    gets,
    getById,
    update,
    // remove
};