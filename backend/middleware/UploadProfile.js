
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },

    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${file.originalname}`)
    }


});

const profileFilter = async (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}


const uploadProfile =multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*2,
        },
    fileFilter:profileFilter
});

module.exports = {uploadProfile}