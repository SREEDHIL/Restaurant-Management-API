const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    rating:Number,
    menu:{
        type:[Object],
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        price:{
            type:Number,
            required:true
        }
    }
});

const Restaurant = mongoose.model("restaurantCollections",RestaurantSchema);
module.exports={Restaurant}