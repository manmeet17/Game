const questionsController = require('../controllers/questionController');
const userController = require('../controllers/userController');
const _ = require("lodash");
const utils = require('../utils')

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.correct = 0;
        socket.attempted = 0;
        socket.totalCorrect = 0;
        socket.on("crash", (score) => {
            questionsController.getLimitedQuestions((err, questions) => {
                if (err) return console.log("Error getting questions" + err);
                console.log("Questions length: " + questions.length);
                questions = utils.shuffleArray(questions);
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
                if (resp.answeredCorrect){
                    socket.correct++;
                    socket.totalCorrect++;
                }
                socket.attempted++;
                socket.emit('answer', resp);
            });
        });

        socket.on('quiz-done', (correct, playerScore, playerId) => {
            if (correct != socket.correct)
                socket.emit('mismatch');
            let data = {
                id: playerId,
                score: Math.floor(playerScore+(playerScore*(correct)/10))
            }
            console.log("Score After: "+data.score);
            socket.emit('restart', correct,data.score);
            socket.correct = 0;
            socket.attempted = 0;
        });

        socket.on('game-over',(score,playerId,timer) =>{
            let data={
                id: playerId,
                score: score,
                timer: timer,
                totalCorrect: socket.totalCorrect
            }
            saveAttempt(data).then((resp)=>{
                socket.emit('show-score',resp);
            }).catch((err) => console.log("Error Updating database"+err));
        });

        var saveAttempt = (data) => {
            return new Promise((resolve,reject) =>{
                userController.getUserById(data.id, (err, user) => {
                    if(err) reject(err);
                    let score = user.score;
                    let attempt={
                        attemptScore: data.score,
                        time: data.timer,
                        totalCorrect: data.totalCorrect
                    }
                    score.push(attempt);
                    let newMaxScore = _.max(score.map(x => x.attemptScore));
                    userController.updateUser(data.id, score, newMaxScore, (err, resp) => {
                        if (err) return reject(err);
                        else resolve(resp);
                    });
                });
            });
        };
    });
};