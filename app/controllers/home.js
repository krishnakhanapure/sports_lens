var pool = require('../../config/database.js');
var Q = require('q');
var query = require('../../config/queries.js');

var newTeamInsert = require('../models/newTeamInsert.js');
var newPlayerInsert = require('../models/newPlayerInsert.js');

exports.login = function(req, res) {
		
    res.render('signup.ejs',  { serverMsg : "" });
	 					
}

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

exports.newTeamData = function(req, res) {
	console.log("newTeamData req.body data... "+JSON.stringify(req.body));

    pool.getConnection((err, connection) => {
		connection.query(newTeamInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				
			}
		});		
	});					
}

exports.newPlayerData = function(req, res) {
	console.log("newPlayerInsert req.body data... "+JSON.stringify(req.body));

    pool.getConnection((err, connection) => {
		connection.query(newPlayerInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				
			}
		});		
	});					
}

exports.checkUser = function(req, res) {

    console.log(JSON.stringify(req.body));	
    var emailsent = req.body.email;
    var passwordsent = 	req.body.password;

    if(emailsent === "admin" && passwordsent === "admin" ) {
    	res.render('homePage.ejs', {} );

    } else {
    	res.render('signup.ejs', { serverMsg : "invalid" });

    }
}


