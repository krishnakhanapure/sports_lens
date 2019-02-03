var queryConstant = require('../../config/queries.js');

var newTeamSPSchema = {
	teamid :'teamid',
	teamName: 'teamName',
	teamCode :'teamCode',
    coachFirstName:'coachFirstName',
    coachLastName: 'coachLastName',
    coachCountry:'coachCountry',
    coachcontractyear: 'coachcontractyear',
    coachcontractyearend: 'coachcontractyearend',
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
	
	return queryConstant.UPDATE_TEAM_VALUES(extractObject);
}

module.exports = { buildQuery: buildQuery };
