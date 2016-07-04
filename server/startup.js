Meteor.startup(function() {
	Meteor.publish("questions", function() {
		return questions.find({});
	});

	Meteor.publish("players", function(){
		console.log(Session.get('gameCurrent'));
		return players.find({});
	});

	Meteor.publish("games", function(){
		return games.find({active : true});
	});
	
});