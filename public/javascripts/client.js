$(document).ready(function(){
    $('.playBtn').click(function(){
        $('.instructions,.playBtn').css("display","none");
        gameStart=true;
        $(document).trigger('fire-game');
    });

    var route=location.pathname;
    console.log(route.search("rules"));
    if(route=="/"){
        $(document).trigger("initialize-entry");
    } else if (route.search('rules') !== -1) {
        $(document).trigger('initialize-socket');
        $(document).trigger("initialize-game");
    } else if (route.search('game-over') !== -1) {
        $(document).trigger('initialize-exit');
    }
});
