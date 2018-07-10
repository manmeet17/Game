var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');
var userController = require('../controllers/userController');
var _ = require('lodash');

/* GET home page. */
router.get('/', function (req, res, next) {
    userController.getLeaderboard((err, leaders) => {
        if (err) {
            console.log("Error getting leaderboard");
            console.log(err);
        } else {
            res.status(200).render('form', {
                title: 'Save the Blood',
                description: 'Some random text',
                topScorrer: leaders
            });
        }
    });

});

router.post('/login', (req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        serviceLine,
    } = req.body;
    if (name.length == 0 || email.length == 0 || serviceLine.length == 0) {
        res.status(400).json({
            message: "Fill all details"
        });
    } else {
        userController.getUser(email, (err, player) => {
            if (err) console.log("User Not found");
            if (player) {
                return res.status(200).json({
                    message: "Player found",
                    player
                });
            } else {
                userController.createUser(name, email, serviceLine, (err, val, player) => {
                    console.log("createUser");
                    if (err) {
                        return res.status(400).json({
                            message: JSON.stringify(err)
                        });
                    } else {
                        console.log(player);
                        return res.status(200).json({
                            message: val,
                            player: player
                        });
                    }
                });
            }
        });

    }
});

router.get('/rules/:id', (req, res) => {
    if (!(req.params) || !(req.params.id)) {
        console.log("Not found");
        return res.redirect('/');
    }
    let id = req.params.id;
    userController.getLeaderboard((err, leaders) => {
        if (err) {
            console.log("Error getting leaderboard");
            console.log(err);
        } else {
            res.status(200).render('index', {
                title: 'Save the Blood',
                topScorrer: leaders,
                userId: id
            });
        }
    });
});

router.get('/rules',(req,res)=>{
    return res.redirect('/');
});

router.get('/game-over/:id', (req, res) => {
    let id = req.params.id;
    userController.getLeaderboard((err, leaders) => {
        if (err) return console.log("Error Getting leaderboard");
        userController.getUserById(id, (err, user) => {
            if (err) {
                console.log("Error: " + err);
                res.redirect('/');
            }
            let lastScore = user.score[user.score.length - 1];
            console.log("Final Score of User: " + lastScore);
            res.status(200).render('game-over', {
                title: 'Save the blood',
                topScorrer: leaders,
                finalScore: lastScore
            });
        });
    });
});

router.get('/game-over',(req,res)=>{
    return res.redirect('/');
});

module.exports = {
    router
};
