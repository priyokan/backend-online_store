const Menu = require('../models/menu.model')

exports.create = (req,res)=>{
    if(!req.body){
        return res.status(404).send({
            message:'menu harus di isi'
        })
    }
    let menu = new Menu({
        namaMenu : req.body.namaMenu,
        deskripsi : req.body.deskripsi,
        imgMenu : "http://localhost:8081/img/menu/"+req.body.namaMenu+'.jpg'
    })

    menu.save()
    .then((result)=>{
        res.send(result)
    })  
    .catch((err)=>{
        res.status(500).send({
            message:err.message||'internal server error'
        })
    })
}
exports.showAll = (req,res)=>{
    Menu.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:err.message||'internal server error'
        })
    });
}
exports.showOne = (req,res)=>{
    Menu.findById(req.params.menuId)
    .then((result) => {
        if (!result) {
            return res.status(404).send({
                message: 'menu tidak ditemukan'
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
    Menu.findByIdAndUpdate(req.params.menuId,{
        namaMenu : req.body.namaMenu,
        deskripsi : req.body.deskripsi,
        imgMenu : "http://localhost:8081/img/menu/"+req.body.namaMenu+'.jpg'
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
    Menu.findByIdAndRemove(req.params.menuId)
    .then((result) => {
        if(!result){
            return res.status(404).send({
                message:'Menu tidak ditemukan'
            })
        }
        res.send({
            message:'Menu berhasil dihapus'
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