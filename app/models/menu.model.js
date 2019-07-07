const mongoose = require('mongoose')
const menuSchema = mongoose.Schema({
    namaMenu:{type:String},
    deskripsi:{type:String},
    imgMenu:{type:String}
},{
    timeStamps:true
})

module.exports = mongoose.model('Menu',menuSchema)