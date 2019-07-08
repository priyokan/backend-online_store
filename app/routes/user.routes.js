
const multer = require('multer')
const express = require('express')
const app = express.Router()
const userController = require('../controller/user.controler')

let storage = multer.diskStorage({
    destination:(req,imgUser,cb)=>{
        cb(null,'./public/img/user')
    },
    filename:(req,imgUser,cb)=>{
        cb(null,req.body.nama+'.jpg')
    }
})
let upload = multer({storage:storage})

app.post('/register',upload.single('imgUser'),userController.register)
app.post('/login',userController.login)

module.exports = app