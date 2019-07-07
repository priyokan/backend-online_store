const mongoose = require('mongoose')
const pesananShema = mongoose.Schema({
    nama:{type:String},
    nomorTelephone:{type:String},
    email:{type:String},
    pesanan:{type:String},
    tangggalAmbil:{type:String},
    status:{type:String}
},{
    timeStamps:true
})
module.exports = mongoose.model('Pesanan',pesananShema)