function initTweens(params) {
    var speed = 500;
    createjs.Tween.get(footPath, {
        loop: true
    }).to({
        x: -w / 2
    }, speed * 45);
    createjs.Tween.get(footPath2, {
        loop: true
    }).to({
        x: -w / 2
    }, speed * 45);
    createjs.Tween.get(buildingsBack, {
        loop: true
    }).to({
        x: -w
    }, speed * 70);

    createjs.Tween.get(buildingsBack2, {
        loop: true
    }).to({
        x: -w
    }, speed * 70);

    createjs.Tween.get(buildingsFront, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);

    createjs.Tween.get(buildingsFront2, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);

    createjs.Tween.get(trees, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);

    createjs.Tween.get(trees2, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);

    createjs.Tween.get(mainRoad1, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);
    createjs.Tween.get(mainRoad2, {
        loop: true
    }).to({
        x: -w
    }, speed * 60);
    //        createjs.Tween.get(pogo, {
    //            loop: true
    //        }).to({
    //            x: -w/2
    //        }, speed * 15);
    createjs.Tween.get(carsLowerLane, {
        loop: true
    }).to({
        x: -w
    }, speed * 35);

    createjs.Tween.get(carsLowerLane2, {
        loop: true
    }).to({
        x: -w
    }, speed * 35);
    createjs.Tween.get(carsUpperLane, {
        loop: true
    }).to({
        x: -w
    }, speed * 40);

    createjs.Tween.get(carsUpperLane2, {
        loop: true
    }).to({
        x: -w
    }, speed * 40);
}