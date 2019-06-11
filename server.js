const express = require ('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require('path')
const PORT = process.env.PORT || 3000

// my middleswares

app.use(express.json())
app.use(morgan('dev'))
app.use("/api", expressJwt({secret: process.env.SECRET}))
// app.use(express.static(path.join(__dirname, "client", "build")))

// my Database Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/home', {useNewUrlParser: true}, () => {
    console.log('[o] Connected to the Database')
})

// My Routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('api/post', require('./routes/postRouter.js'))
app.use('api/get', require('./routes/publicRouter.js'))



// Global Server Error Handler
app.use((err,req, res, next) => {
    console.error(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// Server setup

app.listen(PORT, () => {
    console.log(`[+] Server is running on Port ${PORT}`)
})
