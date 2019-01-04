exports.homePage = function(req, res) {
		
    res.render('homePage.ejs', {
			
	});
	 					
}

exports.newTeam = function(req, res) {
    res.render('newTeam.ejs', {			
			
	}); 					
}

exports.newPlayer = function(req, res) {
    res.render('playerRegistration.ejs', {			
			
	}); 					
}

exports.newTournament = function(req, res) {
    res.render('newTournamentReg.ejs', {			
			
	}); 					
}

exports.newMatch = function(req, res) {
    res.render('NewmatchReg.ejs', {			
			
	}); 					
}

exports.updateDetails = function(req, res) {
    res.render('', {			
			
	}); 					
}

exports.accessControl = function(req, res) {
    res.render('manageUsers.ejs', {			
			
	}); 					
}

exports.approveScore = function(req, res) {
    res.render('matchDataAction.ejs', {			
			
	}); 					
}
