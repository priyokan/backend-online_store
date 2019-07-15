const Kue = require('../models/kue.model')

exports.create = (req,res)=>{
    if(!req.body){
        return res.status(404).send({
            message:'data harus di isi'
        })
    }
    let kue = new Kue({
        namaKue:req.body.namaKue,
        deskripsi:req.body.deskripsi,
        harga:req.body.harga,
        imgKue:"http://localhost:8081/img/kue/"+req.body.namaKue+'.jpg',
        menuType:req.body.menuType,
        jumlahPesanan:req.body.jumlahPesanan||0,
    })

    kue.save()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:'server error'
        })
    });
}
exports.showAll = (req,res)=>{
    Kue.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send({
            message:'server error'
        })
    })
}
exports.showOne = (req,res)=>{
    Kue.findById(req.params.kueId)
    .then((result) => {
        if(!result){
            return res.status(404).send({
                message:'kue tidak ditemukan'
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
    if(!req.body){
        return res.status(404).send({
            message:'data tidak boleh kosong'
        })
    }
    Kue.findByIdAndUpdate(req.params.kueId,{
        namaKue:req.body.namaKue,
        deskripsi:req.body.deskripsi,
        harga:req.body.harga,
        imgKue:"http://localhost:8081/img/kue/"+req.body.namaKue+'.jpg',
        menuType:req.body.menuType,
        jumlahPesanan:req.body.jumlahPesanan,
    },{new:true})
    .then((result) => {
        if(!result){
            return res.status(404).send({
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
    Kue.findByIdAndRemove(req.params.kueId)
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
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"data tidak ditemukan"
            })}

        return res.status(500).send({
            message:'Error penerimaan data'
        })   
    });
}