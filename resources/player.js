function Player(socket, manager) {

	this.id = socket.id;
	this.handle = '';
	this.socket = socket;
	this.inGame = false;
	this.currentLoc = '';
	this.manager = manager;

}


Player.prototype.loc = function(newLoc) {
	if (newLoc) {
		this.currentLoc = newLoc;
	} else {
		return this.currentLoc;
	}
};

Player.joinRoom = function(roomId) {
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


module.exports = Player;