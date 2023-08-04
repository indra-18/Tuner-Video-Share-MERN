const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
})

const VideoModel = mongoose.model('Videos', VideoSchema)
module.exports = VideoModel