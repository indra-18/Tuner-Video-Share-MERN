require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
const PORT= 4943;

const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello From tuner')
})


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })).catch(err => console.log(err.message))
