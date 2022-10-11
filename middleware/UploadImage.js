const multer = require("multer");

const imageFilter = (req, file, cb) => { // filter image file
    //check file type is image
    if (file.mimetype.includes("image/png")) { // if image file
        cb(null, true);
    }
    else if (file.mimetype.includes("image/jpeg")) { // if image file
        cb(null, true);
    }
    else if (file.mimetype.includes("image/jpg")) { // if image file
        cb(null, true);
    }
    else if (file.mimetype.includes("image/webp")) { // if image file
        cb(null, true);
    }
    else {
        cb("Please upload only jpg, png or jpeg image.", false);
    }
};

var storage = multer.diskStorage({ // multer storage
    destination: (req, file, cb) => {
        cb(null, __basedir + "/"); // upload file to backend/
    },
    filename: (req, file, cb) => { // rename file
        const ext = file.mimetype.split("/")[1];
        const filename = Date.now() + "." + ext;
        req.filename = filename;
        cb(null, filename);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;