const questionsController = require('../controllers/questionController');
const userController = require('../controllers/userController');
const _ = require("lodash");
const utils = require('../utils')

module.exports = (io) => {
    io.on("connection", (socket) => {

        socket.score = 0;
        socket.correct = 0;
        socket.attempted = 0;
        socket.on("crash", (score) => {
            console.log("Socket score: ");
            console.log(score);
            questionsController.getLimitedQuestions((err, questions) => {
                if (err) return console.log("Error getting questions" + err);
                console.log("Questions length: " + questions.length);
                questions = utils.shuffleArray(questions);
                questions = utils.limitTo(10, questions);
                console.log("Questions length: " + questions.length);
                socket.emit('fetchedQuestions', questions, score);
            });
        });

        socket.on("start", () => {
            socket.emit("restart");
        });

        socket.on('disconnect', (reason) => {
            console.log("Game ended: " + reason);
        });

        socket.on('checkAnswer', (data) => {
            questionsController.checkAnswer(data.id, data.answer, (err, resp) => {
                if (resp.answeredCorrect)
                    socket.correct++;
                socket.attempted++;
                console.log(resp);
                socket.emit('answer', resp);
            });
        });

        socket.on('quiz-done', (correct, playerScore, playerId) => {
            if (correct != socket.correct)
                socket.emit('mismatch');
            console.log("Quiz Done: " + correct + " " + socket.correct);
            console.log("Attempts: " + socket.attempted);
            console.log("Id is: " + playerId);

            let data = {
                id: playerId,
                score: playerScore
            }
            socket.emit('restart', correct);
            socket.correct = 0;
            socket.attempted = 0;
            saveAttempt(data);
        });

        var saveAttempt = (data) => {
            userController.getUserById(data.id, (err, user) => {
                let score = user.score;
                score.push(data.score);
                let newMaxScore = _.max(score);
                userController.updateUser(data.id, score, newMaxScore, (err, resp) => {
                    if (err) return console.log("Error updating record");
                });
            });
        };
    });
};