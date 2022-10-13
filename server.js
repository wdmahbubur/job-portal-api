const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongo = require("./mongo");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

var whitelist = [
    "*",
];
var corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin);
        if (whitelist.indexOf("*") !== -1) {
            callback(null, true);
        } else {
            callback("You are not allowed to access these resources");
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

global.__basedir = "./public/"; // set base directory

app.use("/api/v1", require("./routes/v1/auth.routes"));
app.use("/api/v1", require("./routes/v1/hr.routes"));
app.use("/api/v1", require("./routes/v1/candidate.routes"));
app.use("/api/v1/admin", require("./routes/v1/admin.routes"));;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/", (req, res) => {
    res.send("Server running...")
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
    mongo();
});