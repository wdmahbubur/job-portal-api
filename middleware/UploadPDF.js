const multer = require("multer");

const pdfFilter = (req, file, cb) => { // filter pdf file
    //check file type is image
    if (file.mimetype.includes("application/pdf")) { // if pdf file
        cb(null, true);
    }
    else {
        cb("Please upload only .pdf file.", false);
    }
};

var storage = multer.diskStorage({ // multer storage
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resume/"); // upload file to backend/
    },
    filename: (req, file, cb) => { // rename file
        const ext = file.mimetype.split("/")[1];
        const filename = file.originalname.split(".")[0] + "-" + Date.now() + "." + ext;
        req.filename = filename;
        cb(null, filename);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: pdfFilter });
module.exports = uploadFile;