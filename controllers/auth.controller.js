const User = require("../services/user.service");

const Token = require("../services/token.service");

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
