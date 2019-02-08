var home = require('../app/controllers/home');
var auth = require('../config/authenticate');


module.exports = function (app) {

    //get Calls
    app.get('/', home.login);
    app.get('/homePage'/*,auth.checkAuth*/, home.homePage);
    app.get('/newTeam'/*,auth.checkAuth*/, home.newTeam);
    app.get('/newPlayer'/*,auth.checkAuth*/, home.newPlayer);
    app.get('/newTournament'/*,auth.checkAuth*/, home.newTournament);
    app.get('/newMatch'/*,auth.checkAuth*/, home.newMatch);
    app.get('/updateDetails', home.updateDetails);
    app.get('/accessControl'/*,auth.checkAuth*/, home.accessControl);
    app.get('/approveScore'/*,auth.checkAuth*/, home.approveScore);
    app.get('/viewreports'/*,auth.checkAuth*/, home.viewReports);
    app.get('/getTeamRandomCode', home.generateTeamCode);
    app.get('/CheckTeamCode', home.teamCodeDuplication);
    app.get('/CheckTeamName', home.teamNameDuplication);
    app.get('/getSelectedTeamValues', home.getSelTeamValues);
    app.get('/updateTeam', home.updateTeam);
    app.get('/updatePlayer', home.updatePlayer);
    app.get('/updateTournament', home.updateTournament);
    app.get('/getSelectedTournamentValues', home.getSelectedTournamentValues);
    app.get('/getSelectedPlayerValues', home.getSelectedPlayerValues);
    app.get('/getPlayersForSelectedTeam', home.getPlayersForSelectedTeam);
    app.get('/getTeamsForSelectedTournament', home.getTeamsForSelectedTournament);
    app.get('/updateMatch', home.updateMatch);
    app.get('/getMatchesForSelectedTournament', home.getMatchesForSelectedTournament);
    app.get('/getMatchesDetails', home.getMatchesDetails);

    //post Calls
    app.post('/newTeamData', home.newTeamData);
    app.post('/newPlayerData', home.newPlayerData);
    app.post('/signup', home.checkUser);
    app.post('/newTournament', home.addTournament);
    app.post('/updateTeamDetails', home.updateTeamDetails);
    app.post('/updateTournamentDetails', home.updateTournamentDetails);
    app.post('/updatePlayerData', home.updatePlayerData);
    app.post('/addMatchDetails', home.addMatchDetails);
    
}
