const File = require("../models/fileModel")

const fs = require("fs")

const uploadImage = async (req, res) => {
    const { post_id } = req.params
    console.log(req)
    try {
        const newFile = await File.create({
            name: req.file.filename,
            post_id
        });
        return res.status(200).json({
            status: "success",
            message: "File created successfully!!",
            name: req.file.filename
        });
    } catch (error) {
        console.log(error)
        res.json({
            error,
        });
    }
}

const getImages = async (req, res) => {
    try {
      const files = await File.find({});
      console.log(files)
      return res.status(200).json({
        files: files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
}

const deleteImage = async (req, res) => {
    const {post_id, img} = req.params
    const file = await File.findOneAndDelete({post_id: post_id})
    if (!file) {
        return res.status(400).json({error: 'No such file'})
    }
    fs.unlinkSync("../frontend/public/upload/"+img)
    res.status(200).json(file)
}

module.exports = {
    uploadImage,
    getImages,
    deleteImage
}