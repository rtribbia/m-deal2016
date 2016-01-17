var cardDB = require('./cardDB.js');
var Card = require('./card.js');

function Deck(gameState) {
	this.state = gameState;
	this.cards = generateDeck();
}

Deck.prototype.getDeck = function() {
	var deckArr = [];
	this.cards.forEach(function(card) {
		deckArr.push(card.getObj);
	});

	return deckArr;

}

function generateDeck() {
	var newDeck = [];
	cardDB.forEach(function (cardObj,i) {
		for (var j = 0; j < cardObj.QTY; j++) {
			var newCard = new Card(cardObj, i);
			newDeck.push(newCard);
		}
	});
	return newDeck;
}



module.exports = Deck;


