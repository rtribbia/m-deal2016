var cardDB = require('./cardDB.js');
var Card = require('./card.js');

function Deck(gameState) {
	this.state = gameState;
	this.cards = generateDeck();
}

function generateDeck() {
	var newDeck = [];
	cardDB.foreach(function (cardObj,i) {
		for (var = 0; j < card.QTY; j++) {
			var newCard = new Card(cardObj, i);
			newDeck.push(newCard);
		}
	});
	return newDeck;
}

module.exports = Card;


