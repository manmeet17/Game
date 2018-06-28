const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    questionBody: String,
    option_a: String,
    option_b: String,
    option_c: String,
    option_d: String,
    correctAnswer: String,
    hint: String
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;