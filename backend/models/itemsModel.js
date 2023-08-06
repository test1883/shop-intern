const mongoose = require("mongoose")

const Schema = mongoose.Schema

const itemsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    sellerName : {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    auth: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Item", itemsSchema)