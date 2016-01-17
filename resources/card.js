

function Card(cardObj,id) {
	this.id = id;
	this.name = cardObj.NAME;
	this.type = cardObj.TYPE;
	this.value = cardObj.VALUE;
	this.propertyColors = {
		a: cardObj.COLOR_A,
		b: cardObj.COLOR_B
	};
	this.propertyValues = {
		a: cardObj.PROP_A,
		b: cardObj.PROP_B
	};
	this.actionTarget = cardObj.TARGET;
	this.description = cardObj.DESC;
	this.subtext = cardObj.SUB;

}

Card.prototype.getObj = function() {
	var cardObj = {}
	cardObj.id = this.id;
	cardObj.name = this.NAME;
	cardObj.type = this.TYPE;
	cardObj.value = this.VALUE;
	cardObj.propertyColors = {
		a: this.COLOR_A,
		b: this.COLOR_B
	};
	cardObj.propertyValues = {
		a: this.PROP_A,
		b: this.PROP_B
	};
	cardObj.actionTarget = this.TARGET;
	cardObj.description = this.DESC;
	cardObj.subtext = this.SUB;
	
	return cardObj;
}

module.exports = Card;


