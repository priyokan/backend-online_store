const express = require('express')
const app = express.Router()
const menus = require('../controller/menu.controller')
const multer = require('multer')
let storage = multer.diskStorage({
    destination:(req,imgMenu,cb)=>{
        cb(null,'./public/img/menu')
    },
    filename:(req,imgMenu,cb)=>{
        cb(null,req.body.namaMenu+'.jpg')
    }
})
let upload = multer({storage:storage})

app.post('/menu',upload.single('imgMenu'),menus.create)
app.get('/menu',menus.showAll)
app.get('/menu/:menuId',menus.showOne)
app.put('/menu/:menuId',upload.single('imgMenu'),menus.edit)
app.delete('/menu/:menuId',menus.delete)

module.exports=app