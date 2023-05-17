const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
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
        type: String,
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
    }
})

const VideoModel = mongoose.model('Videos', VideoSchema)
module.exports = VideoModel