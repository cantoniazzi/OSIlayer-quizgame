//Session.set('gameCurrent','game1');
Template.players.helpers({

	players : function(){
		var p = players.find({gameId : Session.get('gameCurrent')});

		Session.set('hasPlayer',p.count());

		return players.find({gameId : Session.get('gameCurrent')});
	},

	//check order to change active player
	checkOrdem : function(ord) {
		var p = Session.get('playerCurrent');
		if(p === ord)
			return 'active';
	}

});

Template.players.events({
	'click button' : function(e, template) {
		Session.clearPersistent();
	}
});
