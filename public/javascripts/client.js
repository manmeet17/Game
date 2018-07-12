$(document).ready(function(){
    console.log("Document ready");
    $('.playBtn').click(function(){
        $('.instructions,.playBtn').css("display","none");
        $(document).trigger('fire-game');
    });

    var route=location.pathname;
    if(route=="/"){
        $(document).trigger("initialize-entry");
    } else if (route.search('rules') !== -1) {
        $(document).trigger('initialize-socket');
        $(document).trigger("initialize-game");
    } else if (route.search('game-over') !== -1) {
        $(document).trigger('initialize-exit');
    }
});
