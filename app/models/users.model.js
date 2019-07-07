const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const saltRound = 10
const userSchema = mongoose.Schema({
    nama:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
},{
    timeStamps:true
})
userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, saltRound)
    next()
})
module.exports = mongoose.model('User',userSchema)