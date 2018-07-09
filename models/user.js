const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    score:[Number],
    personalBest: Number,
    serviceLine: {
        type: String,
        required: true
    }
});

const User=mongoose.model('User',userSchema);
module.exports=User;