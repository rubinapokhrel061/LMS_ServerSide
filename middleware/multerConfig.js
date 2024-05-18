const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    // const maxFileSize = 50 * 1024;
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(
        new Error(
          "Unsupported file type. Please upload a PNG, JPEG, or JPG image."
        )
      );
      // } else if (file.size > maxFileSize) {
      //   cb(new Error("File size exceeds the maximum allowed (500 KB)."));
    } else {
      cb(null, "./storage"); // Success: specify the destination folder
    }

    // if (
    //   !allowedFileTypes.includes(file.mimetype)
    // ) {
    //   cb(new Error("This filetype is not supported")); //cb(error)
    //   return;
    // }
    // cb(null, "./storage"); //cb(error,success)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
module.exports = {
  storage,
  multer,
};
