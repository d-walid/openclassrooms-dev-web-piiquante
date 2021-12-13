const multer = require("multer");

// Types of files for the file upload
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // destination of the file
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // creating the filename with the mime type + the date/hour
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // result = name_dateHour.extension
  },
});

module.exports = multer({ storage }).single("image");
