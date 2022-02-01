const { number } = require('joi');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const reviewShema=new schema({
    body:String,
    rating:Number

})
module.exports=mongoose.model('Review',reviewShema);