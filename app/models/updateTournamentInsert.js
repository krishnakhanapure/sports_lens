var queryConstant = require('../../config/queries.js');

var newTournamentSPSchema = {
	teamid :'teamid',
	tournamentName: 'tournamentName',
	tournamentType :'tournamentType',
    tournamentCountry:'tournamentCountry',
    tournamentTeam: 'tournamentTeam',
    tournamentStart:'tournamentStart',
    tournamentEnd: 'tournamentEnd'
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newTournamentSPSchema) {
		//extractObject.push(o[newTournamentSPSchema[i]] || '');

		if(newTournamentSPSchema[i] === "tournamentTeam") {

			if(o[newTournamentSPSchema[i]] != undefined){

				var teamArr = o[newTournamentSPSchema[i]];
			}else {
				teamArr= [];
			}
			
			var teamArr = o[newTournamentSPSchema[i]];
			var newStr = "";

			console.log("teamArr. "+teamArr);

			for(j=0; j< teamArr.length; j++) {
				if(j==0)
					newStr += "'"+teamArr[j]+"'";
				else
					newStr += ",'"+teamArr[j]+"'";
			}


			console.log("newStr... "+newStr);			
			extractObject.push(newStr || '');

		}else {
			extractObject.push(o[newTournamentSPSchema[i]] || '');
		}
	}
	
	return queryConstant.UPDATE_TOURNAMENT_VALUES(extractObject);
}

module.exports = { buildQuery: buildQuery };
