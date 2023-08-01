const express = require("express");
const {registerController,loginController, getUserVideos} = require('../controllers/users.controllers')
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.get('/userVideos/:userId', getUserVideos)

module.exports = router;