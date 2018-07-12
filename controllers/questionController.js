/*
 *  Purpose: Provide unified controller functions for performing CRUD operations on the database.
 *  Author: Manmeet Tarun (mtarun@deloitte.com)
 */


// Get Question Schema for the database
const Question = require('../models/questions');


/**
 *  This function exposes a read operation on the questions collection of the database.
 *  findById return only 1 result
 *  @param {String} questionId: Question Unique Id
 *  @return {function} callback with one single question
 */
function getQuestion(questionId,cb){
    Question.findById(questionId,(err,ques) =>{
        if(ques){
            return cb(null,ques);
        }
        else return cb(err);
    });
}


/**
 *  This function exposes a read operation on the questions collection of the database.
 *  find({}) returns all the questions in the database
 *  
 *  @return {function} callback with one single question
 */
function getLimitedQuestions(cb){
    Question.find({}).exec((err,questions) =>{
        if(err) return cb(err);

        return cb(null,questions);
    });
}


/**
 *  This function exposes a read operation on the questions collection of the database.
 *  findById return only 1 result
 *  @param {String} questionId: Question Unique Id.
    @param {String} selectedAnswer: The option selected by user which needs to be checked
 *  @return {function} callback with a json response.
 */
function checkAnswer(id,selectedAnswer,cb){
    getQuestion(id,(err,ques) =>{
        if(err) return cb(err);

        //Object holding the metadata for the answered question
        let resp={
            answeredCorrect: false,
            correctOption: ques['correctAnswer'].toLowerCase()
        }

        if(resp.correctOption==selectedAnswer){
            resp.answeredCorrect=true;
        }
        return cb(null,resp);
    });
}


//Expose public methods
module.exports={
    getQuestion,
    checkAnswer,
    getLimitedQuestions
}