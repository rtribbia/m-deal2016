var cl_socket = io.connect('http://localhost:3000');
var client = new  Client(cl_socket)
var currentDeck;


function Client(socket) {
	this.socket = socket;
	this.loc = 'lobby';
}

Client.prototype.joinRoom = function(roomID) {
	this.socket.emit('cl_joinRoom',roomID)
}


Client.prototype.getDeck = function() {
	this.socket.emit('cl_getDeck','');
}

cl_socket.on('roomList', receivedRooms);
cl_socket.on('joinSuccess', joinedRoom);
cl_socket.on('playersOnline', updatePlayersOnline);

cl_socket.on('deck', function(data) {
	currentDeck = data;

});