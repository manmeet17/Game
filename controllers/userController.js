const User=require('../models/user');
var mongoose=require('mongoose');
const utils=require('../utils');

function createUser(name,email,serviceLine,cb){
    let user=new User({
        name,
        email,
        serviceLine,
    });

    user.save((err) =>{
        if(err) return cb(err);
        else return cb(null,"Successfully created User",user);
    });
}

function getAllUsers(cb){
    User.find({},(err,records) =>{
        if(err) return cb(err);
        return cb(null,records);
    });
}

function getUser(email,cb){
    User.findOne({email},(err,user)=>{
        if(user){
            return cb(null,user);
        }
        else
        return cb(err);
    });
}

function getUserById(id,cb){
    let playerId=mongoose.Types.ObjectId(id);
    User.findById(playerId,(err,user)=>{
        if(err) return cb(err);

        return cb(null,user);
    });
}

function updateUser(id,newScore,newMaxScore,cb){
    let playerId=mongoose.Types.ObjectId(id);
    User.findByIdAndUpdate(playerId,{$set: { score: newScore,personalBest: newMaxScore}},{new: true},(err,user) =>{
        if(err) return cb(err);
        return cb(null,user);
    });
    
}

function getLeaderboard(cb){
    let leader=[];
    User.find({}).sort({score:-1}).exec(function(err,result){
        if(err) {
            console.log("Error getting leaderboard");
            console.log(err);
        }
        result=utils.limitTo(7,result);
        return cb(null,result);
    }); 
}

module.exports={
    createUser,
    getAllUsers,
    getLeaderboard,
    getUser,
    updateUser,
    getUserById
}