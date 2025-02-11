require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const client = require("./config/db");
const authRouter = require("./routes/authRoutes");
const { AdminLogin } = require("./controller/adminController");


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
// app.use("/videos", express.static(path.join(__dirname, "uploads/videos")));

// const uploadsPath = path.join(__dirname, "..", "uploads");
// console.log("Uploads Path:", uploadsPath);

// db connection
client.connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.error(err);
    });


//super admin created 
AdminLogin();


// register student 
app.use("/", authRouter); 


app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
