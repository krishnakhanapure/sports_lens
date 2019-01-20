var queryConstant = require('../../config/queries.js');

var newTeamSPSchema = {
	teamName :'teamName',
	coachFirstName :'coachFirstName',
    coachLastName:'coachLastName',
    coachCountry:'coachCountry',
    TeamPrfName: 'TeamPrfName',
    teamType:'teamType',
    teamLogo:'teamLogo'	
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
