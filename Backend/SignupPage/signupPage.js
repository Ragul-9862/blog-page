const mongoose = require('mongoose')

const User =  new mongoose.Schema({
    Username:String,
    Password:String,
    Repassword:String
})

module.exports = mongoose.model('LoginAuthentication',User)