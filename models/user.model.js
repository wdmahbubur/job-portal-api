const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Provided a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: [validator.isMobilePhone, "Provided a valid phone number"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Your password is not strong. Minimum password length is 6 characters, minimum 1 lowercase & uppercase characters, minimum 1 number and minimum 1 symbol.",
        },

    },
    role: {
        type: String,
        enum: ["admin", "hr", "user"],
        default: "user",
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    if (!this.password) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createAccessToken = async function () {
    try {
        const accessToken = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1m"
        })
        return accessToken;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}


const model = mongoose.model("User", userSchema);
module.exports = model;