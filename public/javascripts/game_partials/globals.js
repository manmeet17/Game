var speed = 100;
var speedFactor = 0.005;
var currentHealth = 100;
var score = 00000001;
var movingSpeed=2.5;
var level=0;
var questions;
var i = 0;
var correct = 0;
var playerId;
var cycles=0;
var gamePaused=true;
var playerScore=0;
var reducedHealthFlag1 = false;
var reducedHealthFlag2 = false;
var reducedHealthFlag3 = false;
var gameStart=false;
potHole=null;
var currentChannel = {
    "pogo": 1,
    "pogo2":0,
    "potHole": 1,
    "chair": 1
};
var socket;
var IMAGE_HOLDER = [{
        src: "../images/healthBar.png",
        id: "healthBar"
    }, {
        src: "../images/trees.png",
        id: "trees"
    },
    {
        src: "../images/mainRoad.png",
        id: "mainRoad"
    }, {
        src: "../images/sky.png",
        id: "sky"
    }, {
        src: "../images/buildingsFront.png",
        id: "buildingsFront"
    }, {
        src: "../images/buildingsBack.png",
        id: "buildingsBack"
    }, {
        src: "../images/carsUpperLane.png",
        id: "carsUpperLane"
    }, {
        src: "../images/carsLowerLane.png",
        id: "carsLowerLane"
    }, {
        src: "../images/foothPath.png",
        id: "footPath"
    }, {
        src: "../images/trees.png",
        id: "trees"
    }, {
        src: "../images/pogoStick.png",
        id: "pogoStick"
    }, {
        src: "../images/potHole.png",
        id: "potHole"
    }, {
        src: "../images/scorebg.png",
        id: "scorebg"
    }, {
        src: "../images/chair.png",
        id: "chair"
    },{
        src: "../images/pogoStick2.png",
        id:"pogoStick2"
    },{
        src: "../images/thunder.png",
        id: "thunder"
    }
];