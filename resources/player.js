function Player(socket, manager, io) {
	this.socket = socket;
	this.manager = manager;
	this.io = io;

	this.id = socket.id;
	this.handle = '';
	this.socket.player = this;
	this.inGame = false;
	this.currentLoc = null;
	

}

//Getter/Setter for players inGame status.
Player.prototype.gameStatus = function(newStatus) {
	if (newStatus) {
		this.inGame = newStatus;
	} else {
		return this.inGame;
	}
}

//Getter/Setter for player location
Player.prototype.loc = function(newLoc) { 
	if (newLoc != undefined) {
		if (this.currentLoc != null)
			this.socket.leave(this.currentLoc);

		console.log(this.id + ': changing location \'' + this.currentLoc + '\' -> \'' + newLoc + '\'');
		this.currentLoc = newLoc;
		this.socket.join(newLoc);
	} else {
		return this.currentLoc;
	}
};
module.exports = Player;


