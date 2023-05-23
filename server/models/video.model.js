const mongoose = require('mongoose')
// const USER = require('./user.model')
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
    date: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
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