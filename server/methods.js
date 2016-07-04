Meteor.methods({

	addGame : function(obj) {
		return games.insert({name: obj.name, currentPlayer: obj.currentPlayer, active: obj.active });
	},

	addPlayer : function(obj) {
		players.insert({name: obj.name, position: obj.position, order: obj.order, gameId: obj.gameId });
	},
	
	playNextPlayer : function(obj) {
		return games.find({_id : obj.id});
	},

	updateCurrentPlayer : function(obj) {
		games.update({_id: obj.id}, {$set : {currentPlayer: obj.currentPlayer}});
	},

	getPlayerHouse : function(obj) {
		var p = players.find({order: obj.order, gameId: obj.gameId}).fetch(); 
		return p;
	},

	checkAnswer : function(ans) {
		return questions.find({_id: obj.id, gameId: obj.gameId});
	},

	updateCurrentPlayerHouse : function(obj) {
		players.update({_id: obj.id}, {$set : {position: obj.position}});
	},
	
});