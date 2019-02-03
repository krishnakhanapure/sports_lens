var queryConstant = require('../../config/queries.js');

var updatePlayerSPSchema = {
	playerId :'playerId',
	playerFirstName :'playerFirstName',
	playerLastName :'playerLastName',
    battingStyle:'battingStyle',
    bowlingStyle:'bowlingStyle',
    teamName: 'teamName',
    playerTeams: 'playerTeams',
    playerImage:'playerImage',
    playerDOB:'playerDOB',
    playerCountry:'playerCountry',
    playerStatus:'playerStatus'	
}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in updatePlayerSPSchema) {
		if(updatePlayerSPSchema[i] === "playerTeams") {
			if(o[updatePlayerSPSchema[i]] != undefined){

				var teamArr = o[updatePlayerSPSchema[i]];
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
			extractObject.push(o[updatePlayerSPSchema[i]] || '');
		}
	}
	
	return queryConstant.UPDATE_NEW_PLAYER(extractObject);
}

module.exports = { buildQuery: buildQuery };
