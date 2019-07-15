const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
const dbConfig = require('./config/database.config')
const jwtConfig = require('./config/jwt.config')
const pesanans = require('./app/routes/pesanan.routes')
const users = require('./app/routes/user.routes')
const menus = require('./app/routes/menu.routes')
const kues = require('./app/routes/kue.routes')

mongoose.Promise = global.Promise

const app = express();

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

app.get('/api',(req,res)=>{
    res.json({'message':'hati hati ada api'})
})

const validateUser = (req,res,next)=>{
    jwt.verify(req.headers['token'],jwtConfig.secretToken,(err,decoded)=>{
        if(err){
            if(err.message!=='jwt expired'){
                res.json({
                    status:'error',
                    message:err.message,
                    data:null
                })
            }else {  
                jwt.verify(req.headers['refreshtoken'],jwtConfig.refreshTokenSecret,(error,decode)=>{
                    if (error) {
                        res.json({
                            status:'error',
                            message:error.message,                    
                        })
                    }else{
                        const payload = jwt.decode(req.headers['refreshtoken'])
                        const newtoken = jwt.sign({id:payload.id},
                            jwtConfig.secretToken,
                            {expiresIn:jwtConfig.tokenLife})  
                        const newrefreshToken = jwt.sign({id:payload.id},
                                            jwtConfig.refreshTokenSecret,
                                            {expiresIn:jwtConfig.refreshTokenLife})     
                        const response = {
                            status:'sukses',    
                            message:'refreshed',
                            data:{
                                newToken:newtoken,
                                newTefreshToken:newrefreshToken,
                            }
                        }     
                        res.status(200).json(response)      
                        next()                    

                    }
            })
            }    
        }else{
            req.body.userId = decoded.id
            next()
        }
    })
}

app.use('/api/user',users)
app.use('/api/admin',validateUser,menus)
app.use('/api/admin',kues)
app.use('/api/admin',pesanans)

app.listen(8000,()=>{
    console.log('Server di port 8000')
})
