Meteor.startup(function() {
	Meteor.subscribe("questions");
	Meteor.subscribe("players");
	Meteor.subscribe("games");
});

Handlebars.registerHelper("setTitle", function() {
  document.title = "Em busca do pacote perdido - Quizz game";
});

//return current gameId in session variable
Handlebars.registerHelper('gameCurrent', function(){
	return Session.get('gameCurrent');
});

//return true/false if players qtd > 0
Handlebars.registerHelper('hasPlayer', function(){
	var qtd = Session.get('hasPlayer');
	return qtd > 0 ? true : false;
});

//return true/false if players qtd > 0
Handlebars.registerHelper('hasPlayerCurrent', function(){
	var qtd = Session.get('playerCurrent');
	return qtd > 0 ? true : false;
});

//return current player
Handlebars.registerHelper('currentPlayer', function(){
	var p = players.find({gameId : Session.get('gameCurrent'), order: Session.get('playerCurrent')}).fetch();
	return p;
});

//return current player order
Handlebars.registerHelper('currentPlayerOrder', function(){
	var p = Session.get('playerCurrent');
	return p;
});

//return true/false if games qtd > 0
Handlebars.registerHelper('hasGame', function(){
	var qtd = Session.get('hasGame');
	return qtd > 0 ? true : false;
});

//return current house of player
Handlebars.registerHelper('currentPlayerHouse', function(){
	//console.log('ok');
	var house = Session.get('housePlayer');
	//console.log(house);
	return house;
});

//return current true/false user's answer 
Handlebars.registerHelper('hasAnswered', function(){
	var answer = Session.get('hasAnswered');
	return answer;
});


//return current true/false user's answer 
Handlebars.registerHelper('answerCorrect', function(){
	var answer = Session.get('answerCorrect');
	
	//console.log(answer == true);

	return answer == true;
});

//return current true/false user's answer 
Handlebars.registerHelper('rolledDice', function(){
	var dice = Session.get('rolledDice');
	
	//console.log(answer == true);

	return dice;
});