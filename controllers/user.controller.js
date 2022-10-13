const User = require("../services/user.service");

const Token = require("../services/token.service");
const Application = require("../services/application.service");
const ObjectId = require('mongoose').Types.ObjectId;

exports.signup = async (req, res) => {
    try {
        const image = "public/" + req.filename;
        const document = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            image: req.filename ? image : null
        }
        await User.create(document);

        res.status(201).json({
            message: "Your account has been created successfully!",
        })

    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email === null) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password || password === null) {
            return res.status(400).json({ message: "Password is required" });
        }

        const query = { email: email };
        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({ message: "This email is not found!" });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect!" });
        }

        if (user.status === "blocked") {
            return res.status(403).json({ message: "You are not allowed to access this portal." });
        }

        const accessToken = await user.createAccessToken();
        await Token.create({ token: accessToken });

        res.json({
            message: "User login successful",
            token: accessToken,
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getLoggedUser = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            user
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

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

// exports.logout = async (req, res) => {
//     try {
//         let token = req.cookies.refreshToken;
//         if (!token) {
//             return res.status(404).json({ message: "User already logged out" })
//         }
//         const verifyToken = await Token.findOneAndDelete({ token: token });
//         if (verifyToken) {
//             return res.clearCookie("refreshToken", {
//                 secure: true,
//                 sameSite: 'none'
//             }).json({ message: "Logged Out Successful" });
//         }
//         return res.json({ message: "Invalid Token" });
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(500).json({ message: "An error while logout admin" });
//     }
// }

// exports.getUsers = async (req, res) => {
//     try {
//         const query = req.query;
//         const users = await gets(query);
//         res.status(200).json({
//             users
//         })
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }


// exports.getUserById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const user = await getById(id);
//         res.status(200).json({
//             user
//         })
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// exports.updateUserById = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const exist = await getById(id);
//         if (!exist) {
//             return res.status(404).json({
//                 message: "No user found!",
//             })
//         }

//         const document = {
//             name: req.body.name,
//             username: req.body.username,
//             email: req.body.email,
//             phone: req.body.phone
//         };
//         const options = { new: true };

//         const user = await update(id, document, options);
//         res.status(200).json({
//             message: "User update successful",
//             user
//         })
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// exports.deleteUserById = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const exist = await getById(id);
//         if (!exist) {
//             return res.status(404).json({
//                 message: "No user found!",
//             })
//         }

//         const user = await remove(id);
//         res.status(200).json({
//             message: "User delete successful",
//             user
//         })
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

