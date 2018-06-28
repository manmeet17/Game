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

// router.get('/rules/:email', (req, res) => {
//   userController.getLeaderboard((err, leaders) => {
//     if (err) {
//       console.log("Error getting leaderboard");
//       console.log(err);
//     } else {
//       res.status(200).render('index', {
//         title: 'Save the Blood',
//         description: 'Some random text',
//         topScorrer: leaders
//       });
//     }
//   });
// });

// router.get('/leader', (req, res) => {
//   userController.getLeaderboard((err, leaders) => {
//     if (err) {
//       return res.status(400).send({
//         success: false,
//         error: JSON.stringify(err)
//       })
//     }
//     res.status(200).send({
//       leaders
//     });
//   });
// });



router.post('/login', (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    serviceLine,
  } = req.body;
  globalData=email;
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
          return res.status(200).json({
            message: val,
            player: player
          });
        }
      });
    }
  });
});

router.get('/rules/:id', (req, res) => {
  if(!(req.params) || !(req.params.id)){
    console.log("Not found");
    return res.redirect('/abc');
  }
  let id=req.params.id;
  console.log("Id is: "+id);
  userController.getLeaderboard((err, leaders) => {
    if (err) {
      console.log("Error getting leaderboard");
      console.log(err);
    } else {
      res.status(200).render('index', {
        title: 'Save the Blood',
        description: 'Some random text',
        topScorrer: leaders,
        userId: id
      });
    }
  });
});

router.post('/question', (req, res) => {
  const {
    qBody,
    a,
    b,
    c,
    d,
    ans,
    hint
  } = req.body;
  console.log(qBody);
  questionController.createQuestion(qBody, a, b, c, d, ans, hint, (err, val, question) => {
    if (err) {
      return res.status(400).json({
        message: err
      });
    } else {
      return res.status(200).json({
        message: val,
        question
      });
    }
  });

});



module.exports = {
  router
};
