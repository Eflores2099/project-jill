import express from 'express';
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require('path')
const PORT = process.env.PORT || 3000

// my middleswares

app.use(express.jason())
app.use(morgan.apply('dev'))
app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use(express.static(path.join(_dirname,"client", "build")))

// my database Connect to Mongoose
mongoose.connect.connect('mongodb://localhost:27017/home', {useNewUrlParser: true}, () => {
    console.log('[o] Connected to the database')
})

// My routes
app.use('/home', require('./routes/postRouter'))
app.use('/api/pic', require('./routes/pic.js'))
app.use('api/post', require('./routes/postRouter.js'))



// Global Server Error Handler
app.use((err,req, res, next) => {
    console.log(err)
    if(err.name ==="UnauthorizedError") {
        res.status(err.status)
    }
    return res.status({errMsg: err.message})
})

// Server setup

app.listen(PORT, () => {
    console.log(`[+] Server is running on Port${PORT}`)
})
