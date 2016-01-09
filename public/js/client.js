var cl_socket = io.connect('http://localhost:3000');
var client = {
	loc : 'lobby',
	socket: cl_socket
}

cl_socket.on('roomList', receivedRooms);
cl_socket.on('joinSuccess', joinedRoom);