const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "../client/public/images/uploads/");
    },
    filename(req, file, cb) {
        const date = moment().format("DDMMYYYY-HHmmss_SSS");
        cb(null, `${date}.${file.originalname.split(".")[1]}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const limits = {
    fileSize: 1024 * 1024 * 5
};
module.exports = multer({
    storage,
    fileFilter,
    limits
});
