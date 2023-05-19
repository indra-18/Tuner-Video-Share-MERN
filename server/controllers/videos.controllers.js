require('dotenv').config();
const VideoModel = require('../models/video.model');
const UserModel = require('../models/user.model')
const cloudinary = require('cloudinary').v2

var exports = module.exports = {};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

function getDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.toLocaleString('default', { month: 'long' });
    let year = today.getFullYear();

    let formattedDate = day + ' ' + month + ' ' + year;
    return formattedDate
}

exports.upload = async (req, res) => {
    const { userId } = req.params;
    const formattedDate = getDate()
    if (!userId) {
        return res.status(401).json({error: 'UserId not provided'})
    }
    try {
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(401).json({error: 'User not found in Database'})
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path,{
            resource_type: "video",
            folder: "tuner"
        });

        const newVideo = new VideoModel({
            ...req.body,
            video: cloudinaryResponse.url,
            date: formattedDate,
        })
        const savedVideo = await newVideo.save();
        user.myVideos.unshift({url: newVideo._id})

        return res.status(201).json({result: savedVideo})
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({error: err.message})
    }
}