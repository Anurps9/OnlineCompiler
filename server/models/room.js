const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
    id: String,
    password: String
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room