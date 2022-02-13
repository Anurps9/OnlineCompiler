const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    googleId: String,
    name: String,
    firstName: String,
    email: String
})

const User = mongoose.model('User', userSchema)

module.exports = User