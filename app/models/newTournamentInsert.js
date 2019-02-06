var queryConstant = require('../../config/queries.js');

var newTournamentSPSchema = {
	tournamentName :'tournamentName',
	tournamentType :'tournamentType',
    tournamentCountry:'tournamentCountry',
    tournamentTeam:'tournamentTeam',
    tournamentStart: 'tournamentStart',
    tournamentEnd:'tournamentEnd'	
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];

	 for (i in newTournamentSPSchema) {
	// 	extractObject.push(o[newTournamentSPSchema[i]] || '');

		if(newTournamentSPSchema[i] === "tournamentTeam") {
			if(o[newTournamentSPSchema[i]] != undefined){

				var teamArr = o[newTournamentSPSchema[i]];
			}else {
				teamArr= [];
			}
			var newStr = "";
			// var primaryTeam = o["teamName"];

			// if(!teamArr.includes(primaryTeam)) {
			// 	teamArr.push(primaryTeam)
			// }

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
	
	return queryConstant.INSERT_NEW_TOURNAMENT(extractObject);
}

module.exports = { buildQuery: buildQuery };
