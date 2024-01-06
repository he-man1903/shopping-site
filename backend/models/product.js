const mongoose = require('mongoose');
const schema=mongoose.Schema;

const Product=new schema({
    Category : {
        type : String,
        required : true
    },
    Name: {
        type : String,
        required : true 
    },
    Price : {
        type : String,
        required : true 
    },
    ImageUrl:{
        type: String,
        required: true
    },
    Count:{
        type: Number,
        required: true
    },
    Rating:{
        type:Number
    },
    RatingCount:{
        type:Number
    },
    Comment:[
        {userId:{type:String},
        user:{type:String},
        comment:{type:String},
         rating:{type:Number}}
    ]
    
})
module.exports=mongoose.model("Product",Product);


