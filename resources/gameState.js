function GameState(id){
	this.id = id;
	this.players = [];
	this.locked = false;
	this.joinable = true;
};


GameState.prototype.addPlayer = function(player) {
	//check if player can join/ isnt already in room
	//add player obj to this.players
}



module.exports = GameState;