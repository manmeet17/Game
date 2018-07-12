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
    score:[{
        attemptScore: {
            type: Number,
            default: 0
        },
        time: Number,
        totalCorrect: Number
    }],
    personalBest: {
        type: Number,
        default: 0
    },
    serviceLine: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const User=mongoose.model('User',userSchema);
module.exports=User;