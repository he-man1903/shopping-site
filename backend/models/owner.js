const mongoose = require('mongoose');
const schema=mongoose.Schema;

const Owner=new schema({
    Name : {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true 
    },
    Password:{
        type: String,
        required: true
    },
    Products:[{type:String,required: true}]
    
})
module.exports=mongoose.model("Owner",Owner);


