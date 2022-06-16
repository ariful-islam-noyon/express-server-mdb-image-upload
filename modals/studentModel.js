const mongoose = require('mongoose')


const studentModel = mongoose.Schema({
   name: String,
   age : Number,
   skill : String
}, {
    timestamps: true
})

module.exports = mongoose.model('student', studentModel)