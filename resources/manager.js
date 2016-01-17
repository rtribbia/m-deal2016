var GameState = require('./gameState.js');
var Player = require('./player.js');


function Manager(io) {
	this.states = [];
	this.io = io;
	this.players = [];
}


Manager.prototype.sendDeck = function(socket) {
	var deck = this.states[socket.player.loc()].getDeck();
	this.io.to(socket.id).emit('deck',deck);
}

//Retrieve list of all rooms where joinable==true
Manager.prototype.getJoinable = function() {
	var result = [];
	this.states.forEach(function(state) {
		var resultItem = {};
		if (state.joinable) {
			resultItem.id = state.id;
			resultItem.playerCount = state.players.length;
			result.push(resultItem);
		}
	});
	return result;
}


//Is room ID joinable? Returns true or false
Manager.prototype.isJoinable = function(roomId) {
	return this.states[roomId].joinable;
}


//Creates game and pushes it to end of gamestate array. New game 'id' == index in gamestate array.
Manager.prototype.createGame = function() {
	var game = new GameState(this.states.length);
	this.states.push(game);
	console.log('Creating game: ' + game.id);
	this.updateLobbyRoomList();
}


//Initializes new session: Creates player and sends them room list
Manager.prototype.initializePlayer = function(socket) {
	var newPlayer = this.createPlayer(socket);
	newPlayer.loc('lobby'); //Set location on player and socket
	this.updateLobbyRoomList();
}

//Creates new player and added them to the players array
Manager.prototype.createPlayer = function(socket) {
	var newPlayer = new Player(socket, this, this.io); 
	this.players.push(newPlayer);
	return newPlayer;
}

//Deletes player from the player array
Manager.prototype.deletePlayer = function(socket) {
	var playerObj = socket.player;
	var playerIndex = this.players.indexOf(playerObj);
	if (playerObj.currentLoc != 'lobby')
		this.removePlayerFromRoom(socket, playerObj.currentLoc);
	this.players.splice(playerIndex,1);
	this.updateLobbyRoomList();

}

//Send joinable room list to roomname or socket
Manager.prototype.sendRoomList = function(target) {
	var joinable = this.getJoinable();

	if ((typeof target) === "string") { //If roomname and not socket object.
		if (target === "everyone") { //Send to EVERYONE connected
			this.io.emit('roomList', joinable);
		} else { //Send to specifc room
			this.io.to(target).emit('roomList', joinable);
		}
	} else {
		this.io.to(target.socket.id).emit('roomList', joinable);
	}
}


//Send everyone in the lobby an updated room list
Manager.prototype.updateLobbyRoomList = function() {
	this.updatePlayersOnline();
	this.sendRoomList('everyone');
	
	//this.sendRoomList('lobby');
}

Manager.prototype.updatePlayersOnline = function() {
	var totalPlayers = this.players.length;
	var playersIngame = this.getIngamePlayers().length;
	this.io.emit('playersOnline',{online: totalPlayers, ingame: playersIngame});
}


Manager.prototype.getIngamePlayers = function() {
	var result = [];

	this.players.forEach(function(p,i) {
		if (p.gameStatus()) //if player.inGame == true
			result.push(i);
	});
	return result;
}

//Add a player to a gamestate (room) at roomID
Manager.prototype.addPlayerToRoom = function(socket,roomId) {
	var currentRoom = this.states[roomId];
	var playerObj = socket.player;
	var hasPlayer = currentRoom.hasPlayer(playerObj);
	if (hasPlayer != null) { //Player is trying to join same room.
		console.log(playerObj.id + ' is already in room # ' + roomId);
		return false;
	} else {
		if (playerObj.gameStatus()) { //Remove player from current room
			this.removePlayerFromRoom(socket,playerObj.currentLoc);
		}
		playerObj.loc(roomId);
		playerObj.gameStatus(true);
		currentRoom.addPlayer(playerObj);
		this.updateLobbyRoomList();
		return true;
	}
}

//Remove a player from a gamestate (room) at roomID
Manager.prototype.removePlayerFromRoom = function(socket,roomId) {
	var playerObj = socket.player;
	this.states[playerObj.currentLoc].removePlayer(playerObj);
}


module.exports = Manager;