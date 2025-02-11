const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../config/db");

const createCategory = async (req,res)=>{
    try{

        const {cat_id , name} = req.body;

        const id = parseInt(cat_id)

        const categoriesData = {
            cat_id:id,
            name
        }
         
        const db = client.db("StdLms")
        const categories = await db.collection("Categories").insertOne(categoriesData);

        res.status(200).json({message:"caregories add sucessfully "})



    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}


const editCategory = async (req,res)=>{
    try{

        const {cat_id , name} = req.body;
         
        const edit_id = parseInt(req.params.cat_id);
        const id = parseInt(cat_id)

        const categoriesData = {
            cat_id:id,
            name
        }
         
        const db = client.db("StdLms")
        const categories = await db.collection("Categories").updateOne({cat_id:edit_id} , {$set:categoriesData});

        res.status(200).json({message:"caregories edit sucessfully "})



    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}

const deleteCat = async (req,res)=>{
    try{
        const id = parseInt(req.params.cat_id);
        const db = client.db("StdLms")
        const categories = await db.collection("Categories").deleteOne({cat_id:id});
        res.status(200).json({message:"caregories delete sucessfully "})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}

const getCat = async (req,res)=>{
    try{

        const db = client.db("StdLms")
        const categories = await db.collection("Categories").find().toArray();
        res.status(200).json(categories)

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}


module.exports = {createCategory,editCategory,deleteCat,getCat};