function Player(socket, manager) {

	this.id = socket.id;
	this.handle = '';
	this.socket = socket;
	this.inGame = false;
	this.currentLoc = '';
	this.manager = manager;

}


Player.prototype.loc = function(newLoc) { //Getter/Setter for player location
	if (newLoc) {
		if (this.currentLoc)
			this.socket.leave(this.currentLoc);
		this.currentLoc = newLoc;
		this.socket.join(newLoc);
	} else {
		return this.currentLoc;
	}
};

Player.prototype.joinRoom = function(roomId) {
	var cplayer = this;
	console.log("cplayer: " + cplayer.ingame);
	console.log("this: " + this.ingame);

	if (this.manager.isJoinable(roomId)) {
		this.loc(roomId); // Join room
		this.manager.states[roomId].addPlayer(this); //Add player to gamestate's player list
		this.inGame = true; //Set in player 'ingame' status to True

		io.to(socket.id).emit('joinSuccess', roomId); //Tell client room join is successful.
	}
}


module.exports = Player;


