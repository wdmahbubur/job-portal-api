const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Token = require("../models/token.model");

const verifyAccessToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token && token.startsWith("Bearer ")) {
            try {
                token = token.split(" ")[1];
                const tokenDoc = await Token.findOne({ token: token });
                if (!tokenDoc) {
                    throw new Error("Unauthorized token")
                }
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
            catch (err) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid request" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    verifyAccessToken
}