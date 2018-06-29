const Question = require('../models/questions');

function createQuestion(qBody, a, b, c, d, ans, hint,cb) {
    let question = new Question({
        questionBody: qBody,
        option_a: a,
        option_b: b,
        option_c: c,
        option_d: d,
        correctAnswer: ans,
        hint
    });
    console.log("Create ques: "+question);
    question.save((err) =>{
        console.log(question);
        if(err) return cb(err);
        return cb(null,"Question Created",question);
    });
}

function getQuestion(questionId,cb){
    Question.findById(questionId,(err,ques) =>{
        if(ques){
            return cb(null,ques);
        }
        else return cb(err);
    });
}

function getLimitedQuestions(cb){
    Question.find({}).exec((err,questions) =>{
        if(err) return cb(err);

        return cb(null,questions);
    });
}

function checkAnswer(id,selectedAnswer,cb){
    getQuestion(id,(err,ques) =>{
        if(err) return cb(err);
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
module.exports={
    createQuestion,
    getQuestion,
    checkAnswer,
    getLimitedQuestions
}