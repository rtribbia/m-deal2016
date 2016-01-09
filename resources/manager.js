var GameState = require('./gameState.js');

function Manager(io) {
	this.states = [];
	this.io = io;
}

Manager.prototype.getJoinable = function() {
	var result = [];
	this.states.forEach(function(state) {
		if (state.joinable)
			result.push(state);
	});
	return result;
}

Manager.prototype.isJoinable = function(roomId) {
	return this.states[roomId].joinable;
}

Manager.prototype.createGame = function() {
	var game = new GameState(this.states.length);
	this.states.push(game);

	console.log('Creating game: ' + game.id);
}

Manager.prototype.sendRoomList = function(socket) {
	console.log('Sending rooms to ' + socket.id)
	var joinable = this.getJoinable();
	this.io.to(socket.id).emit('roomList', joinable);
}


module.exports = Manager;