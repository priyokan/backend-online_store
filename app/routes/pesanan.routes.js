const express = require('express')
const app = express.Router()
const pesanans = require('../controller/pesanan.controller')

app.post('/pesanan',pesanans.create)
app.get('/pesanan',pesanans.showAll)
app.get('/pesanan/:pesananId',pesanans.showOne)
app.put('/pesanan/:pesananId',pesanans.edit)
app.delete('/pesanan/:pesananId',pesanans.delete)

module.exports = app