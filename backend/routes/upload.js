const express = require('express')

// controller functions
const { uploadImage, getImages, deleteImage } = require('../controllers/uploadController')

const router = express.Router()

const multer = require("multer")

//for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/:post_id", upload.single("file"), uploadImage)

router.get("/getFiles", getImages)

router.delete("/:post_id/:img", deleteImage)

module.exports = router