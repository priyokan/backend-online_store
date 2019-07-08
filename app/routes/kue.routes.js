const express = require('express')
const app = express.Router()
const kues = require('../controller/kue.controller')

const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,imgKue,cb)=>{
        cb(null,'./public/img/kue')
    },
    filename:(req,imgKue,cb)=>{
        cb(null, req.body.namaKue+'.jpg')
    }
})
let upload = multer({storage:storage})

app.post('/kue',upload.single('imgKue'),kues.create)
app.get('/kue',kues.showAll)
app.get('/kue/:kueId',kues.showOne)
app.put('/kue/:kueId',upload.single('imgKue'),kues.edit)
app.delete('/kue/:kueId',kues.delete)

module.exports=app