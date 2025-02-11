const express = require("express");
const { registerStd,  UserLogin, stdData, stdId, deleteUser } = require("../controller/authController"); 
const { createCategory, editCategory, deleteCat, getCat } = require("../controller/createCategories");
const {uploadProfile} = require('../middleware/UploadProfile');
const { addVideo, getvideo, videoDelete } = require("../controller/AddVideo");
const { uploadVideo } = require("../middleware/Uploadvideo");

const router = express.Router();


// regiter 
router.post("/registerStd", uploadProfile.single("profileImage") ,registerStd);
//login
router.post("/Login", UserLogin)
// all student data user data 
router.get("/Users",stdData)

// get user by id 
router.get("/User/:Id", stdId);

// delete user by id 
router.delete("/User/:Id", deleteUser);

// create cateogories 

router.post("/addCat",createCategory);
// edit categories 

router.put("/editCat/:cat_id",editCategory);

// delete cat 

router.delete("/deleteCat/:cat_id",deleteCat)

// get All categories

router.get("/categories",getCat)

// add video 

router.post("/addVideo",uploadVideo.single("videoFile"),addVideo)

// get all video

router.get("/allVideo", getvideo)

// delete Video 

router.delete("/deleteVid/:id",videoDelete)



module.exports = router;
