const express= require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const user = require("./routes/user");

const app=express();

app.use(express.json());
app.use(cors({ exposedHeaders: "token" }));


app.use(require("./middlewares/auth"));


// mongoose.connect("mongodb://localhost:27017/hackathondb",{useNewUrlParser:true},()=>{
//     console.log("Connected to Database");
// });
mongoose.connect('mongodb://localhost:27017/hackathondby').then(()=>{
    console.log("Connected to database");}).catch((e)=>{
        console.log(e);
    });

app.use(user);


port = 5000;    
app.listen(port,()=>{
    console.log("Server started");
});
