//clear gameCurrent session

Template.play.events({
	'click button' : function(e, template) {
		var g = games.find({_id : Session.get('gameCurrent')}).fetch();
		
		if(g){
			var cp = (g[0].currentPlayer*1);

			if((cp + 1) > players.find({gameId: Session.get('gameCurrent')}).count())
				cp = 1;
			else
				cp += 1;

			Session.setPersistent('playerCurrent',cp);

			//update player currently playing
			Meteor.call("updateCurrentPlayer", { id : Session.get('gameCurrent'), currentPlayer: cp });

			//get house player currently playing
			Meteor.call("getPlayerHouse", {
				order : Session.get('playerCurrent'),
				gameId : Session.get('gameCurrent')
			}, function(error, result) {
				var p = result;
				Session.setPersistent('housePlayer',p[0].position);
			});
		}
	}
});
