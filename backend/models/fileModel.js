const mongoose = require("mongoose")

const Schema = mongoose.Schema

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    post_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("File", fileSchema)