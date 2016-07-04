Template.questions.helpers({
	questions : function(){
		var layer;
		var housePlayer = Session.get('housePlayer');

		//check OSI layer of the question
		if (housePlayer >= 8) { 
			var mod = housePlayer % 7;

			if (mod ==0) 
				layer = 7;
			else 
				layer = mod;

		} else {
			layer = (housePlayer*1) == 0 ? 1 : housePlayer;
		}

		var question = questions.find({layer: layer});
		

		if(Session.get('questionCurrent')) {
			var Id = Session.get('questionCurrent');			
			question = questions.find({_id : Id});
		}
		else {

			question = _.flatten(_.sample(questions.find().fetch(), 1));	
			//get random question of the layerName	
			//var array = questions.find({layer : layer}).fetch();
			//question = array[randomIndex];
		    //var random = _.sample(questions.find().fetch()); 
		    //question = _.flatten(_.sample(questions.find().fetch(), 1))
		    //question = _.shuffle(questions.find({layer: layer}).fetch());
		    //question = question[0];

		    //question = questions.find({_id: random && random._id, layer: layer});

		    //questionsLayer = _.flatten(_.sample(questions.find({layer : layer}).fetch(), 1))
    		
		    //if(questionsLayer){
			  //  question = new Meteor.Collection(null);
			//    question.insert(questionsLayer);
    		//}
		    //var randomIndex = Math.floor(Math.random() * question.length);

		    //if (randomIndex == 0) randomIndex = 1;   

		    //question = question[randomIndex];

		    //if(question) {
	    	//set current question
			
			console.log(question[0]._id);
			Session.setPersistent('questionCurrent',question[0]._id);
		    
			console.log(Session.get('questionCurrent'));

		    //}
			
		}
		
		return question;
		
	},

	//check order to change active player
	checkLayer : function(layer) {
		var layerName
		switch (layer) {
			case 1:
				layerName = "Física";
			break;
			case 2:
				layerName = "Enlace";
			break;
			case 3:
				layerName = "Rede";
			break;
			case 4:
				layerName = "Transporte";
			break;
			case 5:
				layerName = "Sessão";
			break;
			case 6:
				layerName = "Apresentação";
			break;
			case 7:
				layerName = "Aplicação";
			break;
		}

		return layerName;
	}

});

//check if user's answer is correct
Template.questions.events({
	'click #nexStep' : function(e, template) {

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

			//clear sessions
			Session.clear('hasAnswered');
			Session.clear('rolledDice');
			Session.clear('questionCurrent');
		}

	},

	'click .answer' : function(e, template) {
		var answer = this;
		var question = questions.find({_id : Session.get('questionCurrent')});
		var answers = question.fetch()[0].answers;
		var answerCorrect = question.fetch()[0].answerCorrect;
		var player = players.find({gameId : Session.get('gameCurrent'),order: Session.get('playerCurrent')}).fetch();
		var position = player[0].position;

		//console.log(player[0].position);
		//console.log(player[0]._id);

		//console.log(player)

		Session.setPersistent('hasAnswered',true);
		
		//check if index of answer is the index correct of the question
		if ((answers.indexOf(answer.trim()) + 1) === answerCorrect) {
	 		Session.setPersistent('answerCorrect',true);
			//position += 1;

		} else {
			Session.setPersistent('answerCorrect',false);
			position = position == 0 ? 0 : position-1;
		}
		
		Meteor.call("updateCurrentPlayerHouse", {
			id: player[0]._id,
			gameId: player[0].gameId,
			position: position
		});
	}
});
