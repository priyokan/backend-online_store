const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.config')

exports.register = (req,res,next)=>{
    if(!req.body){
        return res.status(404).send({
            message : 'Data harus di isi'
        })
    }
    User.create({
        nama : req.body.nama,
        email: req.body.email,
        password:req.body.password,
        imgUser:"http://localhost:8081/img/user/"+req.body.nama+'.jpg'
    },(err,result)=>{
        if(err){
            next(err)
        }
        else{
            res.json({status:"berhasil",
                message:"User berhasil di tambahkan",
                data:null
        })
        }
    })
}

exports.login = (req,res,next)=>{
    User.findOne({
        email  : req.body.email
    },(err,info)=>{
        if(!info){
            return res.send({
                message:"email anda tidak ditemukan"
            })
        }
        else if(bcrypt.compareSync(req.body.password,info.password)){
            const token = jwt.sign({id:info._id},
                          jwtConfig.secretToken,
                          {expiresIn:jwtConfig.tokenLife})  
            const refreshToken = jwt.sign({id:info._id},
                                jwtConfig.refreshTokenSecret,
                                {expiresIn:jwtConfig.refreshTokenLife})     
            const response = {
                status:'sukses',    
                message:'logged',
                data:{user:info,
                    token:token,
                    refreshToken:refreshToken,
                }
            }     
            res.status(200).json(response)
            
        }else{
            res.json({
                status:'error',
                message:'password anda salah',
                data:null
            })
        }
    })
}