const bcrypt = require('bcryptjs')
const admin = require('../modals/adminModels')
const asyncHadler = require('express-async-handler')



// get all admin
const getAllAdmin = asyncHadler(async(req, res) => {
      
     let data = await admin.find()

    res.status(200).json(data)
})

// get Single admin
const getSingleAdmin = asyncHadler( async (req, res) => {

  let id = req.params.id;
  let data = await admin.findById(id)

    res.status(200).json(data)
})
// Create admin
const createAdmin = asyncHadler(async (req, res) => {

    const {name, email, username, password, age, skill, location, cell} =  req.body
 
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

 if(!name || !email || !username || !age || !cell || !skill){
    res.status(404).json({
        Message: "All Field Are Required"
    })
 }else{
    let data = await admin.create({
        ...req.body,
        password : hashPass
    })
    res.status(200).json({
        Message: "Data Create Successfull"
    })
 }
})
// Update admin
const updateAdmin = asyncHadler( async (req, res) => {

    await res.status(200).json({
        message : 'Update Admin'
    })
})

// Delete admin
const deleteAdmin = asyncHadler(async (req, res) => {

     const deleteData = await admin.findById(req.params.id)

if(!deleteData){
    res.status(400).json({
        message : 'Data Not Found'
    })
}else{
    let data = await admin.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message : `${data.name}, Er Data Delete Succesfull`
    })
}
    
})

// Admin Profile
const adminProfile = (req, res)=> {
    res.json(req.user)
}

// Admin Timeline
const adminTimeline =  (req, res)=> {
    res.json(req.user)
}

module.exports = {
    getAllAdmin,
    getSingleAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    adminProfile,
    adminTimeline
}