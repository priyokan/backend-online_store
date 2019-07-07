const mongoose = require('mongoose')
const kueSchema = mongoose.Schema({
    nama:{type:String},
    deskripsi:{type:String},
    harga:{type:String},
    imgKue:{type:String},
    menuType:{type:String},
    jumlahPesanan:{type:String},    
},{
    timeStamps:true
})
module.exports = mongoose.model('Kue',kueSchema)