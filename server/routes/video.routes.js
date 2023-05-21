require('dotenv').config()
const router = require('express').Router();
const videoController = require('../controllers/videos.controllers');
const multer = require('multer');

const path = require('path')

const storage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mkv") {
            cb(new Error("File type is not supported", false));
            return;
        }
        cb(null, true);
    }
})

router.post('/video/:userId', storage.single('video'), videoController.upload)
router.get('/video/search', videoController.searchByTitle)
router.get('/searchlist/video/:videoId', videoController.getById);
router.get('/home/video/:videoId', videoController.getById);
router.get('/video', videoController.getAllVideos);
router.put('/video/:userId/:videoId', videoController.updateVideoDetails)
router.delete('/video/:userId/:videoId', videoController.deleteVideo)

module.exports = router;