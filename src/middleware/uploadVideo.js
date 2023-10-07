const multer = require("multer");
const path = require("path");

// simpan file

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}${ext}`;
      cb(null, fileName);
    },
  }),

  fileFilter: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    const fileSize = parseInt(req.headers["content-length"]);
    const maxSize = 100 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: "File size exceeds 100MB need lower than 100mb",
      };
      return cb(error, false);
    }
    // console.log(file);
    if (file.mimetype === "video/mp4" || file.mimetype === "video/mpeg") {
      cb(null, true);
    } else {
      const error = {
        message: "file must be a .mp4 or .mpeg ",
      };
      cb(error, false);
    }
  },
});

const uploadVideo = (req, res, next) => {
  const multerSingle = multerUpload.single("video");
  multerSingle(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: "Error uploading",
        err: err.message,
      });
    } else {
      next();
    }
  });
};

module.exports = uploadVideo;
