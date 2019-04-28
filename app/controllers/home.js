var pool = require('../../config/database.js');
var Q = require('q');
var queryStr = require('../../config/queries.js');

var newTeamInsert = require('../models/newTeamInsert.js');
var newPlayerInsert = require('../models/newPlayerInsert.js');
var newTournamentInsert = require('../models/newTournamentInsert.js');
var updateTeamInsert = require('../models/updateTeamInsert.js');
var updateTournamentInsert = require('../models/updateTournamentInsert.js');
var updatePlayerInsert = require('../models/updatePlayerInsert.js');
var newMatchInsert = require('../models/newMatchInsert.js');
var updateMatchInsert = require('../models/updateMatchInsert.js');
var newUserInsert = require('../models/newUserInsert.js');

exports.login = function(req, res) {
		
    res.render('signup.ejs',  { serverMsg : "" });
	 					
}

exports.homePage = function(req, res) {
		
    res.render('homePage.ejs',  {});
	 					
}

exports.newSignup = function(req, res) {
		
    res.render('newUserSignIn.ejs', {
			
	});
	 					
}

exports.newUserSignup = function(req, res) {

	pool.getConnection((err, connection) => {
		connection.query(newUserInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {

				console.log('user entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "You Have Added New User Successfully!",
					redirectRoute : "/newSignup"

				});
			}
		});		
	});		
 //    res.render('newUserSignIn.ejs', {
	// });				
}

exports.newTeam = function(req, res) {
	pool.getConnection((err, connection) => {
		
	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    Q.all([queryCountry()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in playerinsert.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results));
	        res.render('newTeam.ejs', {
				countryList:results[0]
			});
	      }
	    });
	});						
}

exports.newPlayer = function(req, res) {
	pool.getConnection((err, connection) => {
		function queryTeams() {
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TEAM_NAMES_CODES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryBowlingStyle(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_BOWLING_STYLES(),defered.makeNodeResolver());
	      return defered.promise;
	    }  

	    Q.all([queryTeams(), queryCountry(), queryBowlingStyle()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in fetching values from DB.. "+err);
	        res.end();
	      }
	      else {
	        res.render('playerRegistration.ejs', {
				     teamsList:results[0],
				     countryList:results[1],
				     bowlingStyles:results[2]
				  });
	      }
	    });
	});	
}


exports.newTournament = function(req, res) {

	pool.getConnection((err, connection) => {
		
	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryTeams(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TEAM_NAMES_CODES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    Q.all([queryCountry(), queryTeams()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in fetching from DB.. "+err);
	        res.end();
	      }
	      else {
	        res.render('newTournamentReg.ejs', {
				countryList:results[0],
				teamsList:results[1]
			});
	      }
	    });
	});	 					
}

exports.newMatch = function(req, res) {

	pool.getConnection((err, connection) => {
		
	    function queryTournament() {
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TOURNAMENT_NAMES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryCountry() {
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryFormats(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_MATCH_FORMATS(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    Q.all([queryTournament(), queryCountry(), queryFormats()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in fetching from DB.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results[0]));
	        res.render('NewmatchReg.ejs', {
				tournamentList:results[0],
				countryList:results[1],
				formatList:results[2]
			});
	      }
	    });
	});	 					
}

exports.updateDetails = function(req, res) {
    res.render('updateDetails.ejs', {			
			
	}); 					
}

exports.accessControl = function(req, res) {

	pool.getConnection((err, connection) => {
		
	    function queryTournament() {
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TOURNAMENT_NAMES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryUserAccess(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_USER_ACCESS(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    Q.all([queryTournament(), queryUserAccess()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in fetching from DB.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results[1]));
	      	res.render('manageUsers.ejs', {			
				tournamentList:results[0],
				usersList:results[1],
			}); 
	      }
	    });
	});	 					
}

exports.approveScore = function(req, res) {
    res.render('matchDataAction.ejs', {			
			
	}); 					
}

exports.viewReports = function(req, res) {
    res.render('reportScreen.ejs', {			
			
	}); 					
}

exports.generateTeamCode = function(req, res) {
    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_TEAM_RANDOM_CODES(), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result[0]["func_generate_team_code()"]);
				console.log('data entered successfully');
				
			}
		});		
	});					
}

exports.teamCodeDuplication = function(req, res) {

	var codeToTest = req.query.codeTest;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_TEAM_CODE_DUPLICATION(codeToTest), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {

				res.send(result[0]);
				
			}
		});		
	});					
}

exports.teamNameDuplication = function(req, res) {

	var nameToTest = req.query.nameTest;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_TEAM_NAME_DUPLICATION(nameToTest), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result[0]);
				
			}
		});		
	});					
}

exports.checkEmailDuplication = function(req, res) {

	var dataToTest = req.query.datatoValidate;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_EMAIL_DUPLICATION(dataToTest), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {

				res.send(result[0]);
				
			}
		});		
	});					
}

exports.checkNumberDuplication = function(req, res) {

	var dataToTest = req.query.datatoValidate;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_NUMBER_DUPLICATION(dataToTest), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {

				res.send(result[0]);
				
			}
		});		
	});					
}

exports.checkUserNameDuplication = function(req, res) {

	var dataToTest = req.query.datatoValidate;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_USERNAME_DUPLICATION(dataToTest), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {

				res.send(result[0]);
				
			}
		});		
	});					
}

exports.newTeamData = function(req, res) {

    pool.getConnection((err, connection) => {
		connection.query(newTeamInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/newTeam"

				});
			}
		});		
	});					
}

exports.newPlayerData = function(req, res) {

    pool.getConnection((err, connection) => {
		connection.query(newPlayerInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {

				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/newPlayer"

				});
			}
		});		
	});					
}

exports.addTournament = function(req, res) {

    pool.getConnection((err, connection) => {
		connection.query(newTournamentInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {

				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/newTournament"

				});
			}
		});		
	});					
}

exports.checkUser = function(req, res) {

    var usernamesent = req.body.username;
    var passwordsent = 	req.body.password;
    console.log("in checkuser..."+usernamesent+"......\n......."+passwordsent);

	pool.getConnection((err, connection) => {
		connection.query(queryStr.CHECK_VALIDATE_EMAIL_PASSWORD(usernamesent), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and fetching user details query");
				console.log(err);
				
			} else {

				if(result[0] === undefined || result[0].decodedPW !== passwordsent) {
			    	
			    	res.render('signup.ejs', { serverMsg : "invalid" });

			    } else {
			    	req.session.user_id = usernamesent;
			    	res.render('homePage.ejs', {} );

			    }

				//console.log(JSON.stringify(result[0].decodedPW));
				
			}
		});		
	});		
}

exports.updateTeam = function(req, res) {
	pool.getConnection((err, connection) => {
		
	    function queryTeams(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TEAM_NAMES_CODES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    Q.all([queryTeams(), queryCountry()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in playerinsert.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results));
	        res.render('updateTeam.ejs', {
	        	teamsList:results[0],
				countryList:results[1]
			});
	      }
	    });
	});						
}

exports.updateMatch = function(req, res) {
	pool.getConnection((err, connection) => {
		
	    function queryTournament(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TOURNAMENT_NAMES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryFormats(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_MATCH_FORMATS(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    Q.all([queryTournament(), queryCountry(), queryFormats()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in fetching from DB.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results[0]));
	        res.render('updateMatch.ejs', {
				tournamentList:results[0],
				countryList:results[1],
				formatList:results[2]
			});
	      }
	    });
	});							
}

exports.getSelTeamValues = function(req, res) {

	var teamCode = req.query.teamCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_SELECTED_TEAM_VALS(teamCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("team details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.getMatchesForSelectedTournament = function(req, res) {

	var tournamentCode = req.query.tournamentCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_MATCHES_FROM_TOURNAMENT(tournamentCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("match details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.getMatchesDetails = function(req, res) {

	var MatchCode = req.query.MatchCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_MATCHES_DETAILS(MatchCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("match data details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.updateTeamDetails = function(req, res) {

    pool.getConnection((err, connection) => {
		connection.query(updateTeamInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/updateTeam"

				});
			}
		});		
	});					
}

exports.updatePlayer = function(req, res) {

	pool.getConnection((err, connection) => {
		
	    function queryTeams(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TEAM_NAMES_CODES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryBowlingStyle(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_BOWLING_STYLES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryPlayers(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_PLAYERS_NAMES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryPlayersStatus(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_PLAYER_STATUS(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    Q.all([queryTeams(), queryBowlingStyle(), queryCountry(), queryPlayers(), queryPlayersStatus()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in updatePlayer.. "+err);
	        res.end();
	      }
	      else {
	      	console.log("check the players list... "+JSON.stringify(results[3]));
	        res.render('updatePlayer.ejs', {
	        	teamsList:results[0],
	        	bowlingStyles:results[1],
				countryList:results[2],
				playerList:results[3],
				playerStatus:results[4]
			});
	      }
	    });
	});					
}

exports.updateTournament = function(req, res) {

	pool.getConnection((err, connection) => {
		
	    function queryTeams(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TEAM_NAMES_CODES(),defered.makeNodeResolver());
	      return defered.promise;
	    }

	    function queryCountry(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_COUNTRIES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    function queryTournaments(){
	      var defered = Q.defer();
	      connection.query(queryStr.GET_TOURNAMENT_NAMES(),defered.makeNodeResolver());
	      return defered.promise;
	    } 

	    Q.all([queryTeams(), queryCountry(), queryTournaments()]).then((results) => {
	      connection.release();
	      if(err) {
	      	console.log("err in updateTournament.. "+err);
	        res.end();
	      }
	      else {
	      	console.log(JSON.stringify(results));
	        res.render('updateTournament.ejs', {
	        	teamsList:results[0],
				countryList:results[1],
				tournamentList:results[2]
			});
	      }
	    });
	});					
}

exports.getSelectedTournamentValues = function(req, res) {

	var tournamentCode = req.query.tournamentCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_SELECTED_TOURNAMENT_VALS(tournamentCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("tournament details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.updateTournamentDetails = function(req, res) {

	var teamCode = req.query.teamCode;

    pool.getConnection((err, connection) => {
		connection.query(updateTournamentInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/updateTournament"

				});
			}
		});		
	});					
}

exports.getSelectedPlayerValues = function(req, res) {

	var playerCode = req.query.playerCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_SELECTED_PLAYER_VALS(playerCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("player details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.updatePlayerData = function(req, res) {

	var teamCode = req.query.teamCode;

    pool.getConnection((err, connection) => {
		connection.query(updatePlayerInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/updatePlayer"

				});
			}
		});		
	});					
}

exports.getPlayersForSelectedTeam = function(req, res) {

	var teamCode = req.query.teamCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_PLAYERS_FOR_SELECTED_TEAMS(teamCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("slected player details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.getTeamsForSelectedTournament = function(req, res) {

	var tournamentCode = req.query.tournamentCode;

    pool.getConnection((err, connection) => {
		connection.query(queryStr.GET_TEAMS_FOR_SELECTED_TOURNAMENT(tournamentCode), (err, result) => {
			connection.release();
			if(err) {
				console.log("Error in connection and retrieve query");
				console.log(err);
				
			} else {
				res.send(result);
				console.log("slected teams details... "+JSON.stringify(result));
				
			}
		});		
	});					
}

exports.addMatchDetails = function(req, res) {
	console.log("inside addMatchDetails");

    pool.getConnection((err, connection) => {
		connection.query(newMatchInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {

				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/newMatch"

				});
			}
		});		
	});					
}

exports.updateMatchDetails = function(req, res) {

    pool.getConnection((err, connection) => {
		connection.query(updateMatchInsert.buildQuery(req.body), (err, rows, fields) => {
			connection.release();
			if(err) {
				console.log("Error in connection and insert query");
				console.log(err);
				
			} else {
				console.log('data entered successfully');
				res.render('redirectPage.ejs', { 
					Message : "Data Entered Successfully!",
					redirectRoute : "/updateMatch"

				});
			}
		});		
	});					
}



