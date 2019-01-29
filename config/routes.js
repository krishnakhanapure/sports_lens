var home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app) {

    //get Calls
    app.get('/', home.login);
    app.get('/homePage', home.homePage);
    app.get('/newTeam', home.newTeam);
    app.get('/newPlayer', home.newPlayer);
    app.get('/newTournament', home.newTournament);
    app.get('/newMatch', home.newMatch);
    // app.get('/updateDetails', home.updateDetails);
    app.get('/accessControl', home.accessControl);
    app.get('/approveScore', home.approveScore);

    //post Calls
    app.post('/newTeamData', home.newTeamData);
    app.post('/newPlayerData', home.newPlayerData);
    app.post('/signup', home.checkUser);
}
