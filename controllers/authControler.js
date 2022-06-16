const admin = require('../modals/adminModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// admin login system
const adminLogin = async (req, res) =>{
    
const {email, password} = req.body

// check user email
const loginData = await admin.findOne({email})
   
// validation user
if(!loginData){
    res.status(400).json({
        message: "Email Not Match"
    })
}
else{

    if( (await bcrypt.compare(password, loginData.password))){

       let jwt_token = jwt.sign({id : loginData._id}, process.env.JWT_TOKEN, {
       expiresIn: "15d"
   });
       res.status(200).json({
            id: loginData._id,
            name: loginData.name,
            email: loginData.email,
            cell: loginData.cell,
            token: jwt_token
        })
    }
    else{
        res.status(400).json({
            message: "Password Is Wrong"
        })
    }
}

    
}


module.exports = {
    adminLogin
}