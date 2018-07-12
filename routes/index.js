var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');
var userController = require('../controllers/userController');

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
    const {
        name,
        email,
        serviceLine,
        loc
    } = req.body;
    var location=loc;

    //Error Handling in case any of the fields are missing
    if (name.length == 0 || email.length == 0 || serviceLine.length == 0 || location.length == 0) {
        res.status(400).json({
            message: "Fill all details"
        });
    } else {

        //Checking if the user already exists in the database using his email address.
        userController.getUser(email, (err, player) => {
            if (err) console.log("User Not found");
            if (player) {
                return res.status(200).json({
                    message: "Player found",
                    player
                });
            } else {

                //Else block runs if a new player logs into the game, we then create a new user using controller methods
                userController.createUser(name, email, serviceLine, location, (err, val, player) => {
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


/*
 *  /rules/id: Route for the game with the unique player id.
 */
 
router.get('/rules/:id', (req, res) => {
    if (!(req.params) || !(req.params.id)) {
        console.log("Not found");
        return res.redirect('/');
    }
    let id = req.params.id;

    //Render leaderboard section of the page
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

//Error handling for rules route, in case the user routes to the /rules page without an id param
router.get('/rules',(req,res)=>{
    return res.redirect('/');
});


/*
 *  /game-over/id: Route for the game-over page with the unique player id.
 */
router.get('/game-over/:id', (req, res) => {
    let id = req.params.id;
    userController.getLeaderboard((err, leaders) => {
        if (err) return console.log("Error Getting leaderboard");
        userController.getUserById(id, (err, user) => {
            if (err) {
                console.log("Error: " + err);
                res.redirect('/');
            }
            let lastScore = user.score[user.score.length - 1].attemptScore;
            console.log("Final Score of User: " + lastScore);
            res.status(200).render('game-over', {
                title: 'Save the blood',
                topScorrer: leaders,
                finalScore: lastScore
            });
        });
    });
});

//Error handling for game-over route, in case the user routes to the /game-over page without an id param
router.get('/game-over',(req,res)=>{
    return res.redirect('/');
});


module.exports = {
    router
};
