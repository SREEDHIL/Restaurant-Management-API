const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Restaurant } = require("./Restaurant");

dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const mongoDB = async()=>{
    await mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("Connected Successfully")
    })
    .catch(()=>{
        console.log("Unable to connect to mongoDB")
    })
};

mongoDB();

app.post('/restaurant', async(req,res)=>{
    try {
        if(!name) return res.status(400).json({message:"Validation failed: [field] is required"});
        if(!location) return res.status()
        const postRest = new Restaurant(req.body);
        await Restaurant.save();
        res.status(201).json(postRest)
    } catch (error) {
        res.status(400).json({error:"Validation failed: [field] is required"})
    }
});

app.get('/restaurant', async(req,res)=>{
    const getRest = await Restaurant.find();
    res.json(getRest);
});

app.get('/restaurant/:id', async(req,res)=>{
    try {
        const getRests = await Restaurant.findById(req.params.id);
        res.json(getRests)
    } catch (error) {
        res.status(404).json({error:"Restaurant not found"})
    }
});

app.put('/restaurant/:id', async(req,res)=>{
    try {
        const putRest = await Restaurant.findByIdAndUpdate(req.params.id, {new:true, setValidator:true});
        putRest.save();
        res.status(200).json(putRest)
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
});

app.delete('/restaurant/:id', async(req,res)=>{
    try {
        const deleteRest = await Restaurant.findByIdAndDelete(req.params.id)
        deleteRest.save();
        res.status(200).json({message:"Deleted Successfully!"})
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
})



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})