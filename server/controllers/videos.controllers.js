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

const getDuration = (duration) => {
  if (duration < 60) return `${duration} sec`;
  const min = Math.floor(duration / 60);
  const sec = parseInt(duration % 60);
  return `${min}:${sec} min`
}

exports.upload = async (req, res) => {
  const { userId } = req.params;
  const formattedDate = getDate()
  if (!userId) {
    return res.status(401).json({ error: 'UserId not provided' })
  }
  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(401).json({ error: 'User not found in Database' })
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "tuner",
      eager: [{ format: 'jpeg', effect: 'preview:duration_2' }],
      eager_async: true,
    });
    
    const formattedDuration = getDuration(cloudinaryResponse.duration)
    const newVideo = new VideoModel({
      ...req.body,
      video: cloudinaryResponse.secure_url,
      thumbnail: cloudinaryResponse.eager[0].secure_url,
      date: formattedDate,
      duration: formattedDuration,
    })
    console.log(newVideo)
    const savedVideo = await newVideo.save();
    user.myVideos.unshift(savedVideo._id)
    await user.save();

    return res.status(201).json({ result: savedVideo })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message })
  }
}

exports.searchByTitle = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await VideoModel.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);

    return res.status(200).json({ result: videos });
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
};

exports.getById = async (req, res) => {
  const { videoId } = req.params
  try {
    const video = await VideoModel.findById(videoId);
    return res.status(200).json({result:video})
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.updateVideoDetails = async (req, res) => {
  const { userId, videoId } = req.params;
  const { title, description, category, visibility } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    const videoIndex = user.myVideos.findIndex((id) => id === videoId);
    if (videoIndex === -1) {
      return res.status(404).json({ error: 'Video Not Found In MyVideos' });
    }

    let video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video Not Found' });
    }

    video.title = title;
    video.description = description;
    video.category = category;
    video.visibility = visibility;

    await video.save();

    return res.status(200).json({ result: 'Video Updated Successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.getAllVideos = async (req, res) => {
  try {
    const allVideos = await VideoModel.find();
    return res.status(200).json(allVideos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.deleteVideo = async (req, res) => {
  const { userId, videoId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log(user.myVideos)
    const videoIndex = user.myVideos.findIndex(id => id === videoId);
    if (videoIndex === -1) return res.status(404).json({ error: 'Video not found in MyVideos' });

    user.myVideos.splice(videoIndex, 1);
    await user.save();

    await VideoModel.findByIdAndDelete(videoId);

    return res.status(200).json({ result: 'Video deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.getMyVideos = async (req, res) => {

  try {

    const myVideo = await VideoModel.find({ postedBy: req.user._id });
    return res.status(200).json(myVideo)

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}