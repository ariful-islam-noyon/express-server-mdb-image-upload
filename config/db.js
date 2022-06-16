const mongoose =require('mongoose');

// set mongoDB connect
const connectMongoDB = async () => {
    
    try{

        let connect = await mongoose.connect(process.env.MONGO_DB);
        console.log(`mongoDB connection success. Host : ${connect.connection.host}`.bgCyan.black);

    }catch(error){

        console.log(`${error}`.bgYellow.red);
    }
}

// export connection
module.exports = connectMongoDB;