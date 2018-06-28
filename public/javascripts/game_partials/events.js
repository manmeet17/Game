function keyboardMove(event) {
    if (event.keyCode == 38 && chair.y > -35) {
        chair.y -= 35;
        if (chair.y == -35)
            setChannel(chair, 0);
        else if (chair.y == 0)
            setChannel(chair, 1);
    }

    if (event.keyCode == 40 && chair.y < 35) {
        chair.y += 35;
        if (chair.y == 35)
            setChannel(chair, 2);
        else if (chair.y == 0)
            setChannel(chair, 1);
    }

    if (event.keyCode == 32) {
        // if (chair.currentAnimation != "jump") {
        //     handleJumpStart();
        //     console.log(currentChannel);
        // }
        console.log(currentChannel);
    }

    if (event.keyCode == 17 && chair.currentAnimation != "jump" && pogo.currentAnimation != "jump-combine") {
        chair.gotoAndPlay("shout");
        if (pogo.x > 0 && pogo.x < w && pogo.currentAnimation != "stand-back")
            pogo.gotoAndPlay("jump-combine");
    }
}

function setChannel(displayObj, channel) {
    currentChannel[displayObj.name] = channel;
}

function changeHealth() {
    currentHealth -= 10
    var healthTo = (currentHealth).toString();
    var scoreParent = document.getElementById('scoreP');
    var scoreT = document.getElementById('score');
    healthBarSprite.gotoAndStop(healthTo);
    if (currentHealth === 0) {
        setTimeout(function () {
            console.log("Crashed: "+score);
            gamePaused=true;
            // createjs.Sound.stop();
            scoreParent.classList.remove('hide');
            scoreT.innerHTML = score;
            for(var j=0;j<100;j++){
                createjs.Sound.volume-=0.01;
            }
            socket.emit("crash",score);
        }, 100);
    }
}

function changeScore(score) {
    var initialScore = "000000000";
    var countScore = score.toString().length;
    var currentScore = score;
    var finalScore = initialScore.slice(0, -countScore) + score;
    return finalScore;
}

function handleJumpStart() {
    //        console.log(chair.regX);
    chair.gotoAndPlay('jump');
    // changeHealth();
}

var soundFiles = [
    { path: "../audio/thunder.mp3", key: "thunder", type: "mp3" },
    { path: "../audio/traffic.mp3", key: "traffic", type: "mp3", main: true }
];

function loadSound(){
    soundFiles.forEach(function(tune){
        createjs.Sound.alternateExtensions=tune.type;
        if(tune.main){
            createjs.Sound.on("fileload",function(){
                sound=createjs.Sound.play(tune.key,
                    {
                        interrupt: createjs.Sound.INTERRUPT_NONE,
                        loop:-1,
                        volume:0.5
                    });
            },this);
        }
        createjs.Sound.registerSound(tune.path,tune.key);
    });
}

function playSoundOnHit(){
    createjs.Sound.play("thunder",{interrupt:createjs.Sound.INTERRUPT_NONE,volume: 1 });
}