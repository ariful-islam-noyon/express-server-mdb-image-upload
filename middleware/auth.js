const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const Admin = require("../modals/adminModels");


// auth check
const authCheck = async (req, res, next) => {

    
if(req.headers.authorization){

   try{

    // get token
    let token = req.headers.authorization.split(' ')[1]

    //  console.log(token);

    // verify Token
    let token_verify = jwt.verify(token, process.env.JWT_TOKEN)
    const { id } = token_verify

    // get login user
    // let login_user_data = await Admin.findById(id)
    req.user = await Admin.findById(id)
    next();
 
   }catch(errors){
       console.log(errors);
   }
    

   
}
else{
    res.json({
        Message : "Token Not Found"
    })
}

}


//  Auth Export
module.exports = {
    authCheck
};