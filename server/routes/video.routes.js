require('dotenv').config()
const router = require('express').Router();
const videoController = require('../controllers/videos.controllers');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tuner',
        public_id: (req, file) => Date.now() + '-' + file.originalname
    }
});

const upload = multer({ storage: storage });

// router.post('/video/:userId', upload.single('video'), videoController.upload)
router.post('/video/:userId', videoController.upload)

module.exports = router;