const mongoose = require('mongoose')
const problemSchema = mongoose.Schema({
    id: String,
    title: String,
    statement: String,
    sampleInput: String,
    sampleOutput: String,
    testInput: String,
    testOutput: String
})

const Problem = mongoose.model('Problem', problemSchema)

module.exports = Problem