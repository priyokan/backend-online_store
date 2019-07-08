const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        if(bcrypt.compareSync(req.body.password,info.password)){
            const token = jwt.sign({id:info._id},
                req.app.get('secretKey'),{
                    expiresIn:'1h',
                })      
            
            res.json({
                status:'sukses',    
                message:'logged',
                data:{user:info,
                    token:token,
                }
            })
            
        }else{
            res.json({
                status:'error',
                message:'email/password salah',
                data:null
            })
        }
    })
}