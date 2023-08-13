require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
const morgan = require('morgan')
const authRoutes = require('./routes/user.routes')
const PORT= 4943;
const videoRouter = require('./routes/video.routes')
const compression = require('compression')

const app = express();

app.use(compression());

app.use(morgan('dev'))

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Hello From tuner')
})

app.use('/', videoRouter)


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
        console.log('Connected to DataBase')
    })).catch(err => console.log(err.message))
