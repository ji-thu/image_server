const mongoose = require('mongoose')

require('dotenv').config()

const express = require('express')



const cors = require('cors')

const router = require('./router/routes')

const db = require('./db/connection')

require('./models/imageSchema');
const Images = mongoose.model("ImageDetails")

const imserver = express()

imserver.use(cors())
imserver.use(express.json())


imserver.use("/",router)

imserver.use('/uploads',express.static('./uploads'))


const PORT = 4000 || process.env.PORT

imserver.listen((PORT),(req,res)=>{
    console.log('listerning on the port '+PORT);
})

imserver.post('/',(req,res)=>{
    res.send('post method started')
})


//////////////////////////////////////////////////////////////////////////////

const multer = require("multer")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

imserver.post("/upload/image",upload.single("image"), async (req,res)=>{
    console.log(req.body);
    const imageName = req.file.filename;

    try{
        await Images.create({image:imageName})
        res.json({status:"ok"})
    }catch{
        res.json({status: error })
    }
})

imserver.get("/get/images", async(req,res)=>{
    try{
        Images.find({}).then((data)=>{
            res.send({status:"ok" , data:data});
        });
    }catch{
        res.json({status:error })
    }
})



