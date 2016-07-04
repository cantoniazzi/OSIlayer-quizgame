Template.addplayer.events({

	'submit #form-player-add': function(e, template){
		
		//to cancel default form submit
		e.preventDefault(); 

		var input = $('#name');		
		var name = input.val();
		
		if(name != '') {
			Meteor.call("addPlayer", 
				{
					name     : name, 
					usuario  : this.userId,
					position : 0,
					order    : (Session.get('hasPlayer') *1) + 1,
					gameId   : Session.get('gameCurrent')
				});
			input.val('');	
		}

	}
});