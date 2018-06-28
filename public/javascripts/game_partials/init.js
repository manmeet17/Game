$(document).on("initialize-game",function(){
    stage = new createjs.Stage('game-holder');
    createjs.Touch.enable(stage);
    w = stage.canvas.width;
    h = stage.canvas.height;


    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(IMAGE_HOLDER, true, "../images/");
    loadSound();
    
    function handleComplete(e) {
        var healthBarImg = loader.getResult("healthBar");

        //skyImg is an img tag , so are thr others
        skyImg = loader.getResult("sky");
        buildingsBackImg = loader.getResult("buildingsBack");
        buildingsFrontImg = loader.getResult("buildingsFront");
        carsUpperLaneImg = loader.getResult("carsUpperLane");
        carsLowerLaneImg = loader.getResult("carsLowerLane");
        treesImg = loader.getResult("trees");
        mainRoadImg = loader.getResult("mainRoad");
        scorebgImg = loader.getResult("scorebg");
        footPathImg = loader.getResult("footPath");
        //            console.log(skyImg);

        sky = new createjs.Shape();
        //            console.log(sky);
        buildingsBack = new createjs.Shape();
        buildingsBack2 = new createjs.Shape();
        buildingsFront = new createjs.Shape();
        buildingsFront2 = new createjs.Shape();
        carsUpperLane = new createjs.Shape();
        carsLowerLane = new createjs.Shape();
        mainRoad1 = new createjs.Shape();
        mainRoad2 = new createjs.Shape();
        footPath = new createjs.Shape();
        footPath2 = new createjs.Shape();
        healthBar = new createjs.Shape();
        trees = new createjs.Shape();
        trees2 = new createjs.Shape();
        scorebg = new createjs.Shape();
        carsLowerLane = new createjs.Shape();
        carsLowerLane2 = new createjs.Shape();
        carsUpperLane = new createjs.Shape();
        carsUpperLane2 = new createjs.Shape();

        sky.graphics.bf(skyImg).dr(0, 0, w, skyImg.height);
        scorebg.graphics.bf(scorebgImg).dr(0, 0, w, scorebgImg.height);
        mainRoad1.graphics.bf(mainRoadImg).dr(0, 0, w, mainRoadImg.height);
        mainRoad2.graphics.bf(mainRoadImg).dr(mainRoadImg.width - 2, 0, w, mainRoadImg.height);

        //        Looping the shapes, we created 2 shapes and make them move one after the other
        trees.graphics.bf(treesImg).dr(0, 0, w, treesImg.height);
        trees2.graphics.bf(treesImg).dr(treesImg.width, 0, w, treesImg.height);
        buildingsBack.graphics.bf(buildingsBackImg).dr(0, 0, buildingsBackImg.width, buildingsBackImg.height);
        buildingsBack2.graphics.bf(buildingsBackImg).dr(buildingsBackImg.width, 0, buildingsBackImg.width, buildingsBackImg.height * 2);
        buildingsFront.graphics.bf(buildingsFrontImg).dr(0, 0, w, buildingsFrontImg.height);
        buildingsFront2.graphics.bf(buildingsFrontImg).dr(buildingsFrontImg.width, 0, w, buildingsFrontImg.height);
        carsUpperLane.graphics.bf(carsUpperLaneImg).dr(0, 0, w, carsUpperLaneImg.height);
        carsUpperLane2.graphics.bf(carsUpperLaneImg).dr(carsUpperLaneImg.width, 0, w, carsUpperLaneImg.height);
        carsLowerLane.graphics.bf(carsLowerLaneImg).dr(0, 0, w, carsLowerLaneImg.height);
        carsLowerLane2.graphics.bf(carsLowerLaneImg).dr(carsLowerLaneImg.width, 0, w, carsLowerLaneImg.height);
        footPath.graphics.bf(footPathImg).dr(0, 0, footPathImg.width, footPathImg.height);
        footPath2.graphics.bf(footPathImg).dr(footPathImg.width - 1, 0, footPathImg.width, footPathImg.height);
        text = new createjs.Text(score, "11px Arial", "#ffffff");
        text.x = 220;
        text.y = 33;
        text.textBaseline = "alphabetic";


        var healthSprite = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("healthBar")],
            "frames": {
                "regX": -350,
                "height": 38,
                "count": 11,
                "regY": -10,
                "width": 152
            },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "0": [0, 1, "0"],
                "10": [0, 1, 1, 1.5],
                "20": [0, 2, 2, 1.5],
                "30": [0, 3, 3, 1.5],
                "40": [0, 4, 4, 1.5],
                "50": [0, 5, 5, 1.5],
                "60": [0, 6, 6, 1.5],
                "70": [0, 7, 7, 1.5],
                "80": [0, 8, 8, 1.5],
                "90": [0, 9, 9, 1.5],
                "100": [0, 10, "100"],
                "s100": [10]
            }
        });

        var thunderSprite=new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("thunder")],
            "frames":{
                "regX": 0,
                "width": 684,
                "regY": 0,
                "height": 384,
                "count": 40
            },
            "animations":{
                "blueSky":[0,"blueSky"],
                "lightning1":[1,28,"lightning2",speed*0.06],
                "lightning2":[1,28,"lightning3",speed*0.06],
                "lightning3":[1,28,"blueSky",speed*0.06]

            }
        });

        var guyWheelchair=new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("guyWheelchair")],
            "frames": {
                "regX": 0,
                "width": 205,
                "regY": 0,
                "height": 200,
                "count": 62
            },
            "animations": {
                "move":[0,61,"move",speed*0.02]
            }
        });


        var pogoStickSprite = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("pogoStick")],
            "frames": {
                "regX": 0,
                "height": 233,
                "count": 90,
                "regY": 0,
                "width": 82
            },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "stand": [0],
                'jumpUp': [60, 89, "jumpUp", speed * 0.013],
                "jump-combine": [0, 59, "stand-back", speed * 0.015],
                "stand-back": [50]
            }
        });

        var pogoStickSprite2 = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("pogoStick2")],
            "frames": {
                "regX": 0,
                "height": 233,
                "count": 90,
                "regY": 0,
                "width": 82
            },
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "stand": [0],
                'jumpUp': [60, 89, "jumpUp", speed * 0.013],
                "jump-combine": [0, 59, "stand-back", speed * 0.015],
                "stand-back": [50]
            }
        });

        var chairSprite = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("chair")],
            "frames": {
                "regX": -340,
                "height": 264,
                "count": 224,
                "regY": -450,
                "width": 203
            },
            "animations": {
                "stand": [0],
                "shout": [1, 37, "move"],
                "move": [106, 160, "move", speed * 0.05],
                "jump": [38, 105, "move", speed * 0.025],
                "hit":[164,224,"move",speed*0.04]
            }
        });
        
        thunder=new createjs.Sprite(thunderSprite,"blueSky");
        healthBarSprite = new createjs.Sprite(healthSprite, "s100");
        pogo = new createjs.Sprite(pogoStickSprite, "jumpUp");
        pogo2=new createjs.Sprite(pogoStickSprite2,"jumpUp");
        chair = new createjs.Sprite(chairSprite, "move");
        guy=new createjs.Sprite(guyWheelchair,"move");
        chair.name = "chair";
        pogo.name = "pogo";
        pogo2.name="pogo2";
        pogo.x = w;
        pogo.y = h - 130;
        pogo2.x=w+50;
        pogo2.y=h-180;
        potfunc();
        hitter(level);
        stage.addChild(thunder, scorebg, buildingsBack, buildingsBack2, buildingsFront, buildingsFront2, trees, trees2, footPath, footPath2, mainRoad1, mainRoad2, carsUpperLane, carsUpperLane2, carsLowerLane, carsLowerLane2, pogo,pogo2, healthBarSprite, potHole, chair, text);

        this.document.onkeydown = keyboardMove;

        stage.addEventListener("stagemousedown", handleJumpStart);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if(gameStart){
            createjs.Ticker.addEventListener("tick", tick);
        }
        if (!event.paused) {
            initTweens();
        }
    }

    function potfunc() {
        var potHoleSprite = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("potHole")],
            "frames": {
                "regX": 0,
                "height": 105,
                "count": 13,
                "regY": 0,
                "width": 80
            },

            "animations": {
                "openLid": {
                    frames: [0],
                    next: "openLid"
                },
                "closeLid": {
                    frames: [10, 11, 12],
                    next: "openLid",
                    speed: speed * 0.001
                },
                "moveLid": [0, 9, "closeLid", speed * 0.003]
            }
        });
        potHole = new createjs.Sprite(potHoleSprite, "openLid");
        potHole.x = w - 77;
        potHole.y = h - 85;
        potHole.name = "potHole";
        console.log("Initial x: " + potHole.x);
    }

    function hitter(level) {
        setTimeout(function(){
            if(movingSpeed<8){
                movingSpeed+=0.008;
                level+=1;
                hitter(level);
            }
        },1);
    }
});

$(document).on("initialize-socket",function(){
    socket=io();
    socket.on('fetchedQuestions',(questions,score) =>{
        $("#game").css('display', 'none');
        $(".questions").css('display', 'block');
        console.log(questions.length);
        quiz.loadQuestions(questions,score);
        quiz.showNextQuestion();
    });

    socket.on("mismatch",() =>{
        window.alert("There was a discrepancy");
    });

    socket.on('answer',(data)=>{
        quiz.checkedAnswer(data);
    });

    socket.on('restart',(correct) =>{
        $('#game').css('display','block');
        $(".questions").css('display', 'none');
        currentHealth=10*correct;
        var healthTo = (currentHealth).toString();
        healthBarSprite.gotoAndStop(healthTo);
        createjs.Sound.volume=1;
        gamePaused=false;
    });
});