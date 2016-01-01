var express = require('express');
var app = express();
var http = require('http');
// var io = require('socket.io')(http);
var server = http.createServer(app);
var io = require('socket.io').listen(server);


var gameStates = {
	states: [],



	getJoinable : function() {
		var result = [];
		this.states.forEach(function(state) {
			if (state.joinable)
				result.push(state);
		});
		return result;
	}, createGame : function() {
		var newGame = {};
		newGame.id = this.states.length;
		newGame.players = [];
		newGame.locked = false;
		newGame.joinable = true;
		this.states.push(newGame);
		console.log('Creating game: ' + newGame.id);
	}, sendLobbyList : function(socket) {
		console.log('Sending lobbies to ' + socket.id)
		var joinable = this.getJoinable();
		io.to(socket.id).emit('lobbyList', joinable);
	}
};




io.on('connection', function(socket){
	var newPlayer = createPlayer(socket);
	newPlayer.loc('lobby');
	socket.join('lobby');
	console.log('New player connected: ' + newPlayer.id);

	if (gameStates.getJoinable().length == 0) {
		gameStates.createGame();
	}
	
	gameStates.sendLobbyList(socket);

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
	return newPlayer;
}


app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);