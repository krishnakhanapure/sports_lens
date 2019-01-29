var home = require('../app/controllers/home');
var auth = require('../config/authenticate');


module.exports = function (app) {

    //get Calls
    app.get('/', home.login);
    app.get('/homePage',auth.checkAuth, home.homePage);
    app.get('/newTeam',auth.checkAuth, home.newTeam);
    app.get('/newPlayer',auth.checkAuth, home.newPlayer);
    app.get('/newTournament',auth.checkAuth, home.newTournament);
    app.get('/newMatch',auth.checkAuth, home.newMatch);
    app.get('/updateDetails', home.updateDetails);
    app.get('/accessControl',auth.checkAuth, home.accessControl);
    app.get('/approveScore',auth.checkAuth, home.approveScore);
    app.get('/viewreports',auth.checkAuth, home.viewReports);

    //post Calls
    app.post('/newTeamData', home.newTeamData);
    app.post('/newPlayerData', home.newPlayerData);
    app.post('/signup', home.checkUser);
}
