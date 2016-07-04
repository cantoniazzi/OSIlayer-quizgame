Template.games.helpers({

	games : function(){
		var g = games.find({});

		Session.set('hasGame',g.count());

		return g;
	}
});

//clear gameCurrent session
Template.games.events({
	'click button' : function(e, template) {
		var game = this;
		Session.setPersistent('gameCurrent',game._id);
	}
});