var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var Manager = require('./resources/manager.js');
var Player = require('./resources/player.js');

var manager = new Manager(io);

io.on('connection', function(socket){
	var newPlayer = new Player(socket, manager, io); 
	newPlayer.loc('lobby'); //Set location on player and socket

	//if (manager.getJoinable().length == 0) { //Check for available rooms
		manager.createGame(); //if none, create room.
//	}
	
	manager.sendRoomList(newPlayer); //Send room list to client.


	//Socket client event listeners
	socket.on('cl_joinRoom',function(roomId) {
		manager.addPlayerToRoom(socket.player, roomId);
	});

});



app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);


