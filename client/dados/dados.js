Template.dados.events({
	'click button' : function(e, template) {
		var house = Math.floor(Math.random() * 6) + 1 ;
		var player = players.find({gameId : Session.get('gameCurrent'),order: Session.get('playerCurrent')}).fetch();
		var position = player[0].position;

		Session.setPersistent('rolledDice',house);

		position += house;

		Meteor.call("updateCurrentPlayerHouse", {
			id: player[0]._id,
			gameId: player[0].gameId,
			position: position
		});

		Session.clear('hasAnswered');

	}
});