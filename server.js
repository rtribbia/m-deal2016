var express = require('express');
var app = express();
var http = require('http');
// var io = require('socket.io')(http);
var server = http.createServer(app);
var io = require('socket.io').listen(server);


var gameStates = {
	states: []
}

gameStates.getJoinable = function() {
	var result = [];
	this.states.forEach(function(state) {
		if (state.joinable)
			result.push(state);
	});
	return result;
}

gameStates.isJoinable = function(roomId) {
	return this.states[roomId].joinable;
}

gameStates.createGame = function() {
	var newGame = {};
	newGame.id = this.states.length;
	newGame.players = [];
	newGame.locked = false;
	newGame.joinable = true;

	newGame.addPlayer = function(player) {
		//check if player can join/ isnt already in room
		//add player obj to this.players
	}

	this.states.push(newGame);
	console.log('Creating game: ' + newGame.id);
}

gameStates.sendRoomList = function(socket) {
	console.log('Sending rooms to ' + socket.id)
	var joinable = this.getJoinable();
	io.to(socket.id).emit('roomList', joinable);
}

io.on('connection', function(socket){
	var newPlayer = createPlayer(socket);
	newPlayer.loc('lobby');
	socket.join('lobby');
	console.log('New player connected: ' + newPlayer.id);

	if (gameStates.getJoinable().length == 0) {
		gameStates.createGame();
	}
	
	gameStates.sendRoomList(socket);
	socket.on('joinRoom',newPlayer.joinRoom);

});


function createPlayer(socket) {
	var newPlayer = {};
	newPlayer.id = socket.id;
	newPlayer.handle = "";
	newPlayer.socket = socket;
	newPlayer.inGame = false;
	newPlayer.currentLoc = '';

	newPlayer.loc = function(newLoc) {
		if (newLoc) {
			this.currentLoc = newLoc;
		} else {
			return this.currentLoc;
		}
	};

	newPlayer.joinRoom = function(roomId) {
		if (gameStates.isJoinable(roomId)) {
			console.log('socket.leave..');
			socket.leave(this.currentLoc);
			console.log('this.loc');
			this.currentLoc = roomId;
			console.log('this.socket.join');
			this.socket.join(roomId);
			gameStates.states[roomId].addPlayer(this);
			io.to(socket.id).emit('joinSuccess', roomId);
			this.inGame = true;
		}
	}


	return newPlayer;
}


app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);