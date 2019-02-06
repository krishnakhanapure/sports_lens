var queryConstant = require('../../config/queries.js');

var newMatchSPSchema = {
	tournamentName :'tournamentName',
	teamOne: 'teamOne',
	teamtwo :'teamtwo',
    matchType:'matchType',
    matchDate: 'matchDate',
    stadiumName:'stadiumName',
    matchCity: 'matchCity',
    stadiumCountry: 'stadiumCountry',
    umpOne: 'umpOne',
    umpTwo: 'umpTwo',
    referee: 'referee',
    analyst: 'analyst',
    playersDetails: 'playersDetails'
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newMatchSPSchema) {
		extractObject.push(o[newMatchSPSchema[i]] || '');
	}
	
	return queryConstant.INSERT_NEW_MATCH(extractObject);
}

module.exports = { buildQuery: buildQuery };
