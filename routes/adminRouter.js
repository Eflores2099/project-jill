import express from 'express';
const adminRouter = express.Router()
constjwt = require('jsonwebtoken')
const Admin =require('../models/user.js')


// Admin
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
        const newUser = User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }

            const token = jwt.sign(savedUser.withoutPassword(), provess.env.SECRET)

            return res.status(201).send({user: savedUser.withoutPassword(), token})
        })
    })
})