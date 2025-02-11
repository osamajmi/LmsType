
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'./uploads/video/')
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }


});

const profileFilter = async (req,file,cb)=>{
    if(file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv' || file.mimetype === 'video/avi'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}


const uploadVideo =multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*200,
        },
    fileFilter:profileFilter
});

module.exports = {uploadVideo}