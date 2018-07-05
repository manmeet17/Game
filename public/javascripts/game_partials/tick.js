var tick = function(event) {
    // initTweens();
    if (!gamePaused) {
        var pt = potHole.localToLocal(0, 0, chair);
        //console.log(chair.y);
        if (chair.hitTest(pt.x, pt.y)) {
            if (!reducedHealthFlag1) {
                if (currentChannel["chair"] == currentChannel["potHole"]) {
                    changeHealth();
                    thunder.gotoAndPlay("lightning1");
                    chair.gotoAndPlay("hit");
                    playSoundOnHit();
                    reducedHealthFlag1 = true;
                    potHole.gotoAndPlay("moveLid");
                }
            }
        } else {
            if (pt.x <= chair.x) {
                reducedHealthFlag1 = false;
            }
        }

        var pogoPt = pogo.localToLocal(50, 100, chair);
        if (chair.hitTest(pogoPt.x, pogoPt.y)) {
            if (!reducedHealthFlag2) {
                if (currentChannel["chair"] == currentChannel["pogo"]) {
                    changeHealth();
                    playSoundOnHit();
                    thunder.gotoAndPlay("lightning1");
                    chair.gotoAndPlay("hit");
                    reducedHealthFlag2 = true;
                }
            }
        } else {
            if (pogoPt.x <= 50) {
                reducedHealthFlag2 = false;
            }
        }

        var pogo2Pt = pogo2.localToLocal(50, 100, chair);
        if (chair.hitTest(pogo2Pt.x, pogo2Pt.y)) {
            if (!reducedHealthFlag3) {
                if (currentChannel["chair"] == currentChannel["pogo2"]) {
                    changeHealth();
                    playSoundOnHit();
                    thunder.gotoAndPlay("lightning1");
                    chair.gotoAndPlay("hit");
                    reducedHealthFlag3 = true;
                }
            }
        } else {
            if (pogo2Pt.x <= 50) {
                reducedHealthFlag3 = false;
            }
        }
        if ((currentChannel["chair"] == 0 && currentChannel["pogo"] != 0) || (currentChannel["chair"] == "1" && currentChannel["pogo"] == "2")) {
            stage.setChildIndex(pogo, stage.getNumChildren() - 1);
        } else if ((currentChannel["chair"] == 0 && currentChannel["pogo2"] != 0) || (currentChannel["chair"] == "1" && currentChannel["pogo2"] == "2")) {
            stage.setChildIndex(pogo2, stage.getNumChildren() - 1);
        } else {
            stage.setChildIndex(chair, stage.getNumChildren() - 1);
        }

        score += 1;
        if($(window).width()<=1280 || navigator.platform=="Win32"){
            if(movingSpeed<=8){
                movingSpeed+=0.001;
            }
        }else{
            if(movingSpeed<=12){
                movingSpeed+=0.05;
            }
        }
        var finalScore = changeScore(score);
        text.text = finalScore;
        chair.scaleX = 0.5;
        chair.scaleY = 0.5;
        potHole.scale = 0.5;
        pogo.scaleX = 0.5;
        pogo.scaleY = 0.5;
        pogo2.scale = 0.5;
        if (pogo.visible)
            pogo.x -= movingSpeed;
        if (pogo2.visible)
            pogo2.x -= movingSpeed;
        if (potHole.visible)
            potHole.x -= movingSpeed;
        if (potHole.x < 0) {
            potHole.x = null;
            potHole.visible = false;
            //            stage.removeChild(potHole);
            randomCall(potHole);
        } else {
            potHole.x = potHole.x;
        }

        if (pogo.x < 0) {
            pogo.x = null;
            pogo.visible = false;
            pogo.gotoAndPlay("jumpUp");
            randomCall(pogo);
        }
        if (pogo2.x < 0) {
            pogo2.x = null;
            pogo2.visible = false;
            pogo2.gotoAndPlay("jumpUp");
            randomCall(pogo2);
        }
        stage.update(event);
    }

    function randomCall(displayObj) {
        var min = 1;
        var max = 2;
        var rand = Math.floor(Math.random() * (max - min + 1) + min);
        var channelRandom = Math.floor(Math.random() * (3));
        setTimeout(function () {
            setChannel(displayObj, channelRandom);
            if (channelRandom == 0)
                if (displayObj.name.startsWith("pogo"))
                    displayObj.y = h - 180;
                else
                    displayObj.y = h - 120;
            else if (channelRandom == 2)
                if (displayObj.name.startsWith("pogo"))
                    displayObj.y = h - 100;
                else
                    displayObj.y = h - 60;
            else {
                upperLaneOccupied = true;
                if (displayObj.name.startsWith("pogo"))
                    displayObj.y = h - 130;
                else
                    displayObj.y = h - 85;
            }
            displayObj.x = w;
            displayObj.visible = true;
        }, rand * 1000);
    }
}