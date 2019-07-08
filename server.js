const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
const dbConfig = require('./config/database.config')

const users = require('./app/routes/user.routes')
const menus = require('./app/routes/menu.routes')

mongoose.Promise = global.Promise

const app = express();

app.set('secretKey','nodeRestApi')
app.use(cors())
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser())

app.use(express.static('public'))

mongoose.connect(dbConfig.url,{
 useNewUrlParser:true
})

    .then((result) => {
        console.log('database berhasil terhubung')
    }).catch((err) => {
        console.log('error karena'+err) 
        process.exit()             
    });

app.get('/',(req,res)=>{
    res.json({'message':'hati hati ada api'})
})

app.use('/api/admin',menus)
app.use('/api/user',users)

app.listen(8000,()=>{
    console.log('Server di port 8000')
})
