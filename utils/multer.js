const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/images");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, name) => {
      const fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});
const upload = multer({ storage: storage });

// app.get("/test", (req, res) => {
//   res.render("test");
// });

// app.post("/upload", upload.single("image"), function (req, res, next) {
//   console.log(req.file); // req.file is the `avatar` file
// });

module.exports = upload;
