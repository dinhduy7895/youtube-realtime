var express = require('express'),app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3030;
var socketIdList = [];
var currentTime = 0 ;
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
 
io.on('connection', function(socket){
	console.log('connected');

	socket.on('pause', function(){
		socket.broadcast.emit('pause');
	});

	socket.on('play', function(){
		socket.broadcast.emit('play');
	});

	socket.on('disconnect', function(){
		var index = socketIdList.indexOf(socket.id);
		socketIdList.splice(index,1);
		console.log('dissconnect');
	})
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});