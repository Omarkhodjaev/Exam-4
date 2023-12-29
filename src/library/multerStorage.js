const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix);
      file.filename = file.fieldname + "-" + uniqueSuffix;
  },
});

const upload = multer({ storage });
module.exports = { upload };