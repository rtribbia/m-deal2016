var cl_socket = io.connect('http://localhost:3000');
var client = new  Client(cl_socket)



function Client(socket) {
	this.socket = socket;
	this.loc = 'lobby';
}

Client.prototype.joinRoom = function(roomID) {
	this.socket.emit('cl_joinRoom',roomID)
}


cl_socket.on('roomList', receivedRooms);
cl_socket.on('joinSuccess', joinedRoom);
cl_socket.on('playersOnline', updatePlayersOnline);