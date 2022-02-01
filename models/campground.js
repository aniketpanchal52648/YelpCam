const { string } = require('joi');
const mongoose=require('mongoose');
const reviewS = require('../models/review');
const schema=mongoose.Schema;
const CampgroundSchema=new schema({
    title:String,
    image:[
        {
            url:String,
        filename:String
        
        }
    ],
    price:Number,
    description:String,
    location:String,
    author:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    review:[{
        type:mongoose.Types.ObjectId,
        ref:"Review"
    }]
    
});
CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await reviewS.deleteMany({_id:{$in:doc.review}});
    }
})
module.exports=mongoose.model("Campgrounds",CampgroundSchema);