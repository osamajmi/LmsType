
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../config/db");


const AdminLogin = async (req,res)=>{
    try {
       
        const password = "admin@123"
        const db = client.db("StdLms");

        const admin = await db.collection("Admin").findOne({role:"admin"});

        if(!admin){
           
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.collection("Admin").insertOne({
                userId: "admin",
                name: "Super Admin",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Super Admin created sucessfully ")
        }
        else{
            console.log("⚠️ Super Admin Already Exists!");
        }


    }
    catch(err){
        console.log(err);
    }
}






module.exports = {AdminLogin}