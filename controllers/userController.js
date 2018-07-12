/*
 *  Purpose: Provide unified controller functions for performing CRUD operations on the database.
 *  Author: Manmeet Tarun (mtarun@deloitte.com)
 */


// Get User Schema for the database
const User=require('../models/user');
//Mongoose ORM
var mongoose=require('mongoose');
const utils=require('../utils');


/**
 *  This function exposes a create operation on the users collection of the database.
 *  
 *  @return {function} callback with the newly created user
 */
function createUser(name,email,serviceLine, location, cb){
    let user=new User({
        name,
        email,
        serviceLine,
        location
    });

    //Saves the user into the database
    user.save((err) =>{
        if(err) return cb(err);
        else return cb(null,"Successfully created User",user);
    });
}


/**
 *  This function exposes a read operation on the users collection of the database.
 *  find({}) returns all the users

 *  @return {function} callback with all the users
 */
function getAllUsers(cb){
    User.find({},(err,records) =>{
        if(err) return cb(err);
        return cb(null,records);
    });
}


/**
 *  This function exposes a read operation on the users collection of the database.
 *  findOne returns only 1 result
 *  @param {String} email: Email address of the user, to search in the db.
 *  @return {function} callback with one single user
 */
function getUser(email,cb){
    User.findOne({email},(err,user)=>{
        if(user){
            return cb(null,user);
        }
        else
        return cb(err);
    });
}


/**
 *  This function exposes a read operation on the users collection of the database.
 *  findById return only 1 result
 *  @param {String} id: Unique Id of the user, to search in the db.
 *  @return {function} callback with one single user
 */
function getUserById(id,cb){

    //Converts the id from a String into an ObjectId
    let playerId=mongoose.Types.ObjectId(id);
    User.findById(playerId,(err,user)=>{
        if(err) return cb(err);

        return cb(null,user);
    });
}


/**
 *  This function exposes an update operation on the users collection of the database.
 *  findByIdAndUpdate return the updated user
 *  @param {String} id: Unique Id of the user, to search in the db.
 *  @param {String} newScore: New score the user achieved which needs to be updated in the database
 *  @param {String} newMaxScore: New high score of the user which needs to be updated in the database
 *  @return {function} callback with one single user
 */
function updateUser(id,newScore,newMaxScore,cb){

    //Converts the id from a String into an ObjectId
    let playerId=mongoose.Types.ObjectId(id);
    User.findByIdAndUpdate(playerId,{$set: { score: newScore,personalBest: newMaxScore}},{new: true},(err,user) =>{
        if(err) return cb(err);
        return cb(null,user);
    });
    
}


/**
 *  This function exposes a read operation on the users collection of the database.
 *  find({}) returns all the users

 *  @return {function} callback with all the users
 */
function getLeaderboard(cb){
    //sort the results based on score in descending order.
    User.find({}).sort('-score.attemptScore').exec(function(err,result){
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