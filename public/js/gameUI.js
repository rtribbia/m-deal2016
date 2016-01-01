var cl_socket = io.connect('http://localhost:3000');

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

$('#ui_rooms').addClass('shadow-sm');


cl_socket.on('lobbyList', function(lobbies) {
	console.log('Lobby list received...');
	console.log(lobbies);
	lobbies.forEach(function(lobby) {
		$('#ui_rooms').append('<p> Lobby #' + lobby.id + '</p>');

	});

});