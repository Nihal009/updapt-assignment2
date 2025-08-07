const express = require("express");
const { default: mongoose } = require("mongoose");
const TopicData = require("./models/topicdata.model");
const app=express()

const formidableMiddleware = require('express-formidable');

const cors = require("cors");
const MongoString="mongodb://localhost:27017/assignment2"
const fs=require('fs');
const { error } = require("console");
const path= require('path');
const ProcessData = require("./utils/processData.js");

;
app.use(express.json())
mongoose.connect(MongoString).then(()=>
    console.log("Db connected Successfully")).catch(()=>console.log("error connecting to db"))
const db=mongoose.connection
// console.log(db)
app.use(cors({
    origin:['http://localhost:5173']
}
))

app.get('/',(req,res)=>{
    res.send("home")
})

app.get('/api/getData',async (req,res)=>{
        try{
            const data=await TopicData.find()
            res.status(200).json(data)
            // console.log(data)
        }
        catch(error){
            res.status(500).json({"message":error.message})

        }
})

app.post('/api/addTopic',async (req,res)=>{
    
    
    
    try{
       
        const data=await TopicData.insertOne(req.body)
        // console.log("add data:",req.body)
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({"message":error.message})
    }
})


app.put('/api/updateData/:id',async (req,res)=>{
    const _id=req.params.id
    // console.log("p_id",_id)
    const updateData=req.body
    try{
        const data =await TopicData.findByIdAndUpdate(_id,updateData)
        if(!data){
            return res.status(404).json({message:"Item not Found"})
            
        }
        res.json(data)
    }
    catch(error){
        console.error("Error updating item:",error)
        res.status(500).json({message:'Server Error'})
    }
})


app.delete('/api/deleteData/:id',async (req,res)=>{
    const _id=req.params.id;
    try{
        const data=await TopicData.findOneAndDelete({_id})
        if(!data){
            return res.status(404).json({message:"Item not Found"})
        }
        
        res.json({message:"Item Deleted Succesfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Server Error"})

    }
})


app.post('/api/bulk-upload/',formidableMiddleware({
    uploadDir: './uploads',
    multiples: true,
    keepExtensions: true,
    // req.files to be arrays of files
  }), async (req,res)=>{

    

    const file=req.files.file
    
    if(!file){
        res.status(400).json({message:"No file Uploaded"})
    }

    const name=file.name
    const filepath=file.path
if(file.type!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
    fs.unlink(filepath,(err) => {
        if (err) throw err;
        console.log(`${filepath} was deleted`);
    })
    // console.log("")
    res.status(415).json({message:"Invalid File Type"})    
}
else{
    console.log(file)
    const uploadDir=path.join(__dirname,'uploads')
    const NewPath=path.join(uploadDir,name)
    fs.rename(filepath,NewPath,(err) => {
        if (err) throw err;
        console.log(`${name} renamed successfully`);
    })
    const data=await ProcessData(NewPath)
    const NewData=await TopicData.insertMany(data)

    res.status(201).json({message:"File Uploaded Successfully"})
}

// const originalName=req.files.file.name



})


app.listen(4000,()=>{
    console.log("server listening on http://localhost:4000")
})