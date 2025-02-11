
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../config/db");



const registerStd = async (req,res)=>{

    try{

        const { id,userId ,name ,password,email, phone } = req.body

       const paseId = parseInt(id)
       const profileImage = req.file ? req.file.filename : null

        const hassedpassword = await bcrypt.hash(password, 10)

        const StdData = {
            id : paseId ,
            userId,
            name,
            profileImage:profileImage ,
            password:hassedpassword,
            email,
            phone,
            role:"student"
        }

         const db = client.db('StdLms');
         const user = await db.collection('Student').findOne({userId:userId})
         if(user){
            return res.status(200).json({message:"User already exist "})
         }
         if(!user){
            const result = await db.collection('Student').insertOne(StdData)
         }
        //  const result = await db.collection("Student").insertOne(StdData);

         res.status(201).json({message : "student register Sucess "})

    }catch(err){
        console.log(err);
        res.status(500).json({error : " server Error "})
    }
}

const UserLogin = async (req,res)=>{

    try{
        const {userId ,password} = req.body
        const db = client.db('StdLms');

        const user = await db.collection("Student").findOne({userId: userId});
        const superAdmin = await db.collection("Admin").findOne({userId: userId});

        if(user || superAdmin){
            const foundUser = user || superAdmin;
            const isValid = await bcrypt.compare(password, foundUser.password);

            if(isValid){
                const token = jwt.sign({ userId: foundUser.userId ,role : foundUser.role }, 'Lms@@1234jmi', { expiresIn: '1h'})
                res.status(200).json({token : token, userId:userId ,name : foundUser.name , role: foundUser.role})
            }
            else{
                res.status(401).json({error : "Invalid Password "})
            }
        }
        else{
            res.status(401).json({error : "Invalid User Id "})
        }
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({error : " server Error "})
    }
}

//get all user 
const stdData = async (req,res)=>{
    try{

        const db = client.db('StdLms');
        const result = await db.collection("Student").find({}).toArray();
        res.status(200).json(result)


    }
    catch(err){
        console.log(err);
    }
}

const stdId = async (req,res)=>{

     try{
        const id = req.params.Id
        // const data = typeof id ;

        const db = client.db('StdLms');
        const result = await db.collection("Student").findOne({Id: id});
         if(result){
            res.status(200).json(result)
         }
         else{
            res.status(404).json({error : "User Not Found "})
         }
        // res.send(data)


     }
     catch(err){
        console.log(err)
        res.status(500).json({error: " server error "})

     }

}

const deleteUser = async (req,res)=>{
    try{
        const id = parseInt(req.params.Id)
        const db = client.db('StdLms');
        const result = await db.collection("Student").deleteOne({Id: id});
        if(result){
            res.status(200).json({message : "User Deleted Successfully "})
        }
        else{
            res.status(404).json({error : "User Not Found "})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: " server error "})
    }
    
}

const idValidate =  async (req,res)=>{
    try{

        const db = client.db('StdLms');
        const result = await db.collection("Student").find({}).toArray();
        res.status(200).json(result.userId)


    }
    catch(err){
        console.log(err);
    }
}


module.exports = {registerStd,UserLogin,stdData,stdId ,deleteUser};