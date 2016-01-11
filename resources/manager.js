var GameState = require('./gameState.js');

function Manager(io) {
	this.states = [];
	this.io = io;
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
	
	this.sendRoomList('everyone');
	
	//this.sendRoomList('lobby');
}


//Add a player to a gamestate (room) at roomID
Manager.prototype.addPlayerToRoom = function(player,roomId) {
	var currentRoom = this.states[roomId];
	var hasPlayer = currentRoom.hasPlayer(player);
	if (hasPlayer != null) { //Player is trying to join same room.
		console.log(player.id + ' is already in room # ' + roomId);
		return false;
	} else {
		if (player.gameStatus()) { //Remove player from current room
			this.states[player.currentLoc].removePlayer(player);
		}
		player.loc(roomId);
		player.gameStatus(true);
		currentRoom.addPlayer(player);
		this.updateLobbyRoomList();
		return true;
	}
}


module.exports = Manager;