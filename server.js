const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const {authCheck} = require('./middleware/auth');
const connectMongoDB = require('./config/db');
const colore = require('colors');
const path = require('path')

// Multer 
const multer = require('multer');
const { trusted } = require('mongoose');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './media/users')
    },
    filename : (req, file, cb) => {

        // let extName = file.originalname.split(".")[1]

        let extName = path.extname(file.originalname)
        let filenam = Date.now() + Math.round(Math.random() * 10000) + extName

        cb(null, filenam)
    }
})
const upload = multer({
    
    storage: storage,
    limits: (1024 * 1024),
    fileFilter: (req, file, cb) => {
          
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){

            cb(null, true)
        }
        else{
            cb(console.log("File Type Invalid"))
        }
        
    }
})


// mongoDB connection init 
connectMongoDB();

// environment variavble init
const PORT = process.env.SERVER_PORT

// Request Body init
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// auth middleware
// app.use(authCheck)

// middleware use path system
// app.get('/arif', authCheck, (req, res, next) => {
//     console.log('Router Is Ok');
//     next()
// })

// Signle photo Upload
// app.post('/upload',upload.single('profile') ,(req, res) => {
//     res.send("File Upload done")
// })

// Multiple Photo Upload
app.post('/upload',upload.array('profile', 10) ,(req, res) => {
    res.send("File Upload done")
})


// Student Route Use
app.use('/api/students', require('./routes/students'))
app.use('/api/admins', require('./routes/admins'))

// Add express server listener with port
app.listen(PORT, () => console.log(`Our Server is running on port ${PORT}`.bgRed))
