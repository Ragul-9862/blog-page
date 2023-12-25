const mongoose = require('mongoose')

const imageUpload  = mongoose.Schema({
    title : String,
    info:String,
    image:String
})

module.exports = mongoose.model('Imageupload',imageUpload)