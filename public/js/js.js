$(document).ready(function(){
	 players = new Array();
    var socket = io();
    function onYouTubeIframeAPIReady() {
        var temp = $("iframe.yt_players");
        for (var i = 0; i < temp.length; i++) {
            var t = new YT.Player($(temp[i]).attr('id'), {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(t);
        }

    }

    // onYouTubeIframeAPIReady();

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            var src = event.target.a.src;
            var order =  play(src);
            socket.emit('play', order);

        }
        else if (event.data == YT.PlayerState.PAUSED) {
            var src = event.target.a.src;
            var order = pause(src);
            socket.emit('pause',order);
        }
    }

    function pause(src){
        var order ;
        var tempPlayers = $("iframe.yt_players");
        for (var i = 0; i < players.length; i++) {
            if (players[i].a.src == src){
                players[i].pauseVideo();
                order = i ;
                return order;
            }
        }
    }

    function play(src){
        var order ;
        var tempPlayers = $("iframe.yt_players");
        for (var i = 0; i < players.length; i++) {
            if (players[i].a.src != src){
                players[i].pauseVideo();
            } else {
                order = i ;
            }
        }
        return order;
    }

    socket.on('play', function(order){
        players[order].playVideo();
        play(players[order].a.src);
    });


    socket.on('pause', function(order){
        players[order].pauseVideo();
    });
})