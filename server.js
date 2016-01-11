var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var Manager = require('./resources/manager.js');


var manager = new Manager(io);

io.on('connection', function(socket){

	manager.initializePlayer(socket);


	if (manager.getJoinable().length == 0) { //Check for available rooms
		manager.createGame(); //if none, create room.
	}
	

	//Socket client event listeners
	socket.on('cl_joinRoom',function(roomId) {
		manager.addPlayerToRoom(socket, roomId);
	});

	socket.on('disconnect', function () {
		manager.deletePlayer(socket);
  	});

});



app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);


