const Pesanan = require('../models/pesanan.model')

exports.create = (req,res)=>{
    if(!req.body){
        return res.status(404).send({
            message:"data harus di isi"
        })
    }
    let pesanan = new Pesanan({
        nama:req.body.nama,
        nomorTelephone:req.body.nomorTelephone,
        email:req.body.email,
        pesanan:req.body.pesanan,
        tanggalAmbil:req.body.tanggalAmbil,
        status:'ordered'
    })
    pesanan.save()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:err.message||'internal server error'
        })
    });
}
exports.showAll = (req,res)=>{
    Pesanan.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:err.message||'internal server error'
        })
    });
}
exports.showOne = (req,res)=>{
    Pesanan.findById(req.params.pesananId)
    .then((result) => {
        if (!result) {
            return res.status(404).send({
                message: 'pesanan tidak ditemukan'
            })
        }
        res.send(result)
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"data tidak ditemukan"
            })}

            return res.status(500).send({
                message:'Error penerimaan data'
            })        
    });
}
exports.edit = (req,res)=>{
    if (!req.body) {
        return res.status(404).send({
            message:'input tidak boleh kosong'
        })
    }
    Pesanan.findByIdAndUpdate(req.params.pesananId,{
        nama:req.body.nama,
        nomorTelephone:req.body.nomorTelephone,
        email:req.body.email,
        pesanan:req.body.pesanan,
        tanggalAmbil:req.body.tanggalAmbil,
        status:req.body.status
    },{new:true})
    .then((result) => {
        if(!result){
            res.status(404).send({
                message:'data tidak ditemukan'
            })
        }
        res.send(result)
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"data tidak ditemukan"
            })}

        return res.status(500).send({
            message:'Error penerimaan data'
        })   
    });
}
exports.delete = (req,res)=>{
    Pesanan.findByIdAndRemove(req.params.pesananId)
    .then((result) => {
        if(!result){
            return res.status(404).send({
                message:'data tidak ditemukan'
            })
        }
        res.send({
            message:'data berhasil dihapus'
        })
    }).catch((err) => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message:'data tidak ditemukan'
            })
        }
        return res.status(500).send({
            message:'Error penerimaan data'
        })   
    });
}