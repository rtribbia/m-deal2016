





function joinedRoom(room) {

	console.log('Success! Room #' + room + ' has been joined.');
}


function receivedRooms(array) {
	console.log('Room list received...');
	console.log(array);
	array.forEach(function(room) {
		var roomRow = $('<li></li>');
		var btnJoin = $('<button>Join</button>');
		btnJoin.on('click',function(e) {
			console.log('attempting to join room#' + room.id)
			cl_socket.emit('joinRoom',room.id);
		});

		roomRow.append('Lobby #' + room.id + '  - <strong>(' + room.players.length + ' / 4)</strong>');
		roomRow.append(btnJoin);
		$('#room_list').append(roomRow);
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