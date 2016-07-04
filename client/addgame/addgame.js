Template.addgame.events({

	'submit #form-game-add': function(e, template){
		
		//to cancel default form submit
		e.preventDefault(); 

		var input = $('#name');		
		var name = input.val();
		
		if(name != '') {
			Meteor.call("addGame", {
				name: name, 
				active: true,
				currentPlayer: 0
			}, function(error, result) {
				var resultInsert = result;
				Session.setPersistent('gameCurrent',resultInsert);
			});

			input.val('');	
		}

	}
});