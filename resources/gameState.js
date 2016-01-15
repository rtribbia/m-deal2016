var Deck = require('./deck.js');

function GameState(id){
	this.id = id;
	this.players = [];
	this.locked = false;
	this.joinable = true;
	this.deck = new Deck();
};


//Adds player to current gameState (players array)
GameState.prototype.addPlayer = function(player) {
	this.players.push(player);
}

//Removes player from current gamestate (players array)
GameState.prototype.removePlayer = function(player) {
	var inRoom = this.hasPlayer(player);

	if (inRoom != null) {
		console.log('removing ' + player.id + ' from room ID: ' + inRoom);
		this.players.splice(inRoom,1);
		return true;
	} else {
		console.log('attempted to remove ' + player.id + ' from room ID: ' + inRoom + ' BUT PLAYER WAS NOT FOUND');
		return false;
	}
}

//Is player in current gamestate? Return 'true' or 'false'
GameState.prototype.hasPlayer = function(player) {
	var found = null;
	this.players.forEach(function(p,i) {
		if (p.id == player.id) {
			found = i;
		}
	});
	return found;
}


GameState.prototype.sendDeck = function(player) {
	player.io.to(player.socket.id).emit('sv_sendDeck', this.deck);
}

module.exports = GameState;

