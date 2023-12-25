const mongoose = require('mongoose')

const User = mongoose.connect({
    Username:String,
    Password:String
})

module.exports = mongoose.model('LoginAuthentication',User)