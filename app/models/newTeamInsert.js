var queryConstant = require('../../config/queries.js');

var newTeamSPSchema = {
	teamName :'teamName',
	teamCode: 'teamCode',
	coachFirstName :'coachFirstName',
    coachLastName:'coachLastName',
    coachCountry:'coachCountry',
    coachcontractyear: 'coachcontractyear',
    teamType:'teamType',
    teamLogo:'teamLogo',
	teamCountry:'teamCountry'
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newTeamSPSchema) {
		extractObject.push(o[newTeamSPSchema[i]] || '');
	}
	
	return queryConstant.INSERT_NEW_TEAM(extractObject);
}

module.exports = { buildQuery: buildQuery };
