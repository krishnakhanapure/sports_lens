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
    app.get('/updateDetails'/*,auth.checkAuth*/, home.updateDetails);
    app.get('/accessControl'/*,auth.checkAuth*/, home.accessControl);
    app.get('/approveScore'/*,auth.checkAuth*/, home.approveScore);
    app.get('/viewreports'/*,auth.checkAuth*/, home.viewReports);
    app.get('/getTeamRandomCode'/*,auth.checkAuth*/, home.generateTeamCode);
    app.get('/CheckTeamCode'/*,auth.checkAuth*/, home.teamCodeDuplication);
    app.get('/CheckTeamName'/*,auth.checkAuth*/, home.teamNameDuplication);
    app.get('/getSelectedTeamValues'/*,auth.checkAuth*/, home.getSelTeamValues);
    app.get('/updateTeam'/*,auth.checkAuth*/, home.updateTeam);
    app.get('/updatePlayer'/*,auth.checkAuth*/, home.updatePlayer);
    app.get('/updateTournament'/*,auth.checkAuth*/, home.updateTournament);
    app.get('/getSelectedTournamentValues'/*,auth.checkAuth*/, home.getSelectedTournamentValues);
    app.get('/getSelectedPlayerValues'/*,auth.checkAuth*/, home.getSelectedPlayerValues);
    app.get('/getPlayersForSelectedTeam'/*,auth.checkAuth*/, home.getPlayersForSelectedTeam);
    app.get('/getTeamsForSelectedTournament'/*,auth.checkAuth*/, home.getTeamsForSelectedTournament);
    app.get('/updateMatch'/*,auth.checkAuth*/, home.updateMatch);
    app.get('/getMatchesForSelectedTournament'/*,auth.checkAuth*/, home.getMatchesForSelectedTournament);
    app.get('/getMatchesDetails'/*,auth.checkAuth*/, home.getMatchesDetails);
    app.get('/newSignup'/*,auth.checkAuth*/, home.newSignup);
    app.get('/checkEmail'/*,auth.checkAuth*/, home.checkEmailDuplication);
    app.get('/checkNumber'/*,auth.checkAuth*/, home.checkNumberDuplication);
    app.get('/checkUname'/*,auth.checkAuth*/, home.checkUserNameDuplication);

    //post Calls
    app.post('/newTeamData', home.newTeamData);
    app.post('/newPlayerData', home.newPlayerData);
    app.post('/signup', home.checkUser);
    app.post('/newTournament', home.addTournament);
    app.post('/updateTeamDetails', home.updateTeamDetails);
    app.post('/updateTournamentDetails', home.updateTournamentDetails);
    app.post('/updatePlayerData', home.updatePlayerData);
    app.post('/addMatchDetails', home.addMatchDetails);
    app.post('/updateMatchDetails', home.updateMatchDetails);
    app.post('/newUserSignup', home.newUserSignup);
    
}
