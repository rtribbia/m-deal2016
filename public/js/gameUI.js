var cl_socket = io.connect('http://localhost:3000');





cl_socket.on('lobbyList', listLobbies(data));



function listLobbies(array) {
	console.log('Lobby list received...');
	console.log(array);
	array.forEach(function(lobby) {
		$('#ui_rooms').append('<p> Lobby #' + lobby.id + '</p>');

	});
}


function addCard(id) {
	cardDiv = $("<div id='" + id + "' class='card'/>");
	$(cardDiv).addClass('shadow-sm');
	$(cardDiv).on('mousedown', function(e) {
		$(this).removeClass('shadow-sm').addClass('shadow-lg card_pickup');
	});
	$(cardDiv).on('mouseup', function(e) {
		$(this).removeClass('shadow-lg card_pickup').addClass('shadow-sm');
	});
	$(cardDiv).draggable();
	$('#ui_table').append(cardDiv);

}