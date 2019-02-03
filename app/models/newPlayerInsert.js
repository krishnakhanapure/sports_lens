var queryConstant = require('../../config/queries.js');

var newPlayerSPSchema = {
	playerFirstName :'playerFirstName',
	playerLastName :'playerLastName',
    battingStyle:'battingStyle',
    bowlingStyle:'bowlingStyle',
    teamName: 'teamName',
    playerTeams: 'playerTeams',
    playerImage:'playerImage',
    playerDOB:'playerDOB',
    playerCountry:'playerCountry'	
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newPlayerSPSchema) {
		if(newPlayerSPSchema[i] === "playerTeams") {
			if(o[newPlayerSPSchema[i]] != undefined){

				var teamArr = o[newPlayerSPSchema[i]];
			}else {
				teamArr= [];
			}
			
			var newStr = "";
			var primaryTeam = o["teamName"];

			if(!teamArr.includes(primaryTeam)) {
				teamArr.push(primaryTeam)
			}

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
			extractObject.push(o[newPlayerSPSchema[i]] || '');
		}
	}
	
	return queryConstant.INSERT_NEW_PLAYER(extractObject);
}

module.exports = { buildQuery: buildQuery };
