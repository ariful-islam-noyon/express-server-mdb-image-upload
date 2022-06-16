const mongoose = require('mongoose')

// admin model schema
const adminModel = mongoose.Schema({
   name : {
       type : String,
       require : [true, 'Name Field Are Required']
   },
   email : {
       type : String,
       require: [true, 'Email Field Are Required'],
       unique: true,
   },
   cell : {
       type : String,
       require: [true, 'Cell Field Are Required'],
       unique: true,
   },
   username : {
       type : String,
       require: [true, 'User Field Are Required'],
       unique: true,
       lowercase: true,
       minLength: 5,
       maxLength: 10,
   },
   skill : {
      type : String,
   },
   location : {
      type : String,
      require:false,
      default: "Sirajganj"
  },
  age : Number,
  password: String
},
{
    timestamps: true
})


module.exports = mongoose.model('Admin', adminModel)