var queryConstant = require('../../config/queries.js');

var newPlayerSPSchema = {
	playerFirstName :'playerFirstName',
	playerLastName :'playerLastName',
    battingStyle:'battingStyle',
    bowlingStyle:'bowlingStyle',
    teamName: 'teamName',
    playerImage:'playerImage',
    playerDOB:'playerDOB',
    playerCountry:'playerCountry'	
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newPlayerSPSchema) {
		extractObject.push(o[newPlayerSPSchema[i]] || '');
	}
	
	return queryConstant.INSERT_NEW_PLAYER(extractObject);
}

module.exports = { buildQuery: buildQuery };
