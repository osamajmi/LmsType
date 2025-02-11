
const client = require("../config/db")


const addVideo = async (req, res) => {


    try{
        const {id,title,cat_id, description} = req.body;

        const parsid = parseInt(id)
        const videoFile =  req.file ? req.file.filename : null
        const cat_no = parseInt(cat_id)
        // if ( isNaN(cat_no)) {
        //     return res.status(400).json({ error: "Invalid ID or Category" });
        // }
        const videoData = {
            id:parsid,
            title,
            description,
            videoFile:videoFile,
            cat_id:cat_no,
        }


         const db = client.db("StdLms")
         const addVideoData = await db.collection("videos").insertOne(videoData)
         res.json({message:"Video Added Successfully",data:addVideoData})
        



    }catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }

}


const getvideo = async (req, res) => {
    try{
        const db = client.db("StdLms")
        const videoData = await db.collection("videos").find().toArray()
        res.json(videoData)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}

const videoDelete = async (req,res)=>{
   
    try{

        const id = parseInt(req.params.id)
       
        const db = client.db("StdLms")
        const deleteVideo = await db.collection("videos").deleteOne({id:id})
        res.json({message:"Video Deleted Successfully"})
        

    }
    catch(err){

        console.log(err);
        res.status(500).json({error:"server error"})
    }
   
    
    

}

const getByCat_id = async (req,res)=>{
  
    try{

  
     const id = parseInt(req.params.id)
     const db = client.db("StdLms")
     const videoData = await db.collection("videos").find({cat_id:id}).toArray()
     res.json(videoData)
     
    }
    catch(err){

        console.log(err);
        res.status(500).json({error:"server error"})
        

    }

}



module.exports={addVideo,getvideo,videoDelete,getByCat_id}