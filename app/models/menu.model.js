const mongoose = require('mongoose')
const menuSchema = mongoose.Schema({
    judul:{type:String},
    deskripsi:{type:String},
    imgMenu:{type:String}
},{
    timeStamps:true
})

module.exports = mongoose.model('Menu',menuSchema)