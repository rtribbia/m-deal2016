

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


module.exports = Card;


