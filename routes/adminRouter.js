import express from 'express';
const adminRouter = express.Router()
constjwt = require('jsonwebtoken')
const Admin = require('../models/user.js')


// Admin--POST- signup
authRouter.post('/admin', (req, res, next) => {
    Admin.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(400)
            return next(new Error("That username already exists"))
        }
        // Create user
        const newUser = User(req.body)
        // pre-save hook fires, encrypts password, and then the .save() is executed
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // Create token
            const token = jwt.sign(savedUser.withoutPassword(), provess.env.SECRET)
            // send response
            return res.status(201).send({user: savedUser.withoutPassword(), token})
        })
    })
})

// login - POST  - /auth/login
authRouter.post("/login", (req, res, next) => {
    // Find a user by that username (err, user)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        // Does that user exist - send err "Username or password are incorrect"
        if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect"))
        }
        // User.checkpassword(req.body.password) - returns (err, isMatch)
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // If the password didn't match
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or password are incorrect"))
            }
            // Create token
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            // Send Response
            return res.status(200).send({user: user.withoutPassword(), token})
        })
    })
})

module.exports = adminRouter