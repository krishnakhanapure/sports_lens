const environment = process.env.NODE_ENV;
let tableNames = {};

if(environment === 'dev' || environment === 'qa'){
	tableNames["candidateDetails"] = "candidateDetails_qa";
	tableNames["candidateFeedback"] = "candidateFeedback_qa";
	tableNames["candidateInterview"] = "candidateInterview_qa";
	tableNames["candidatesOfferedLetter"] = "candidatesOfferedLetter_qa";
	tableNames["configDetails"] = "configDetails_qa";
	tableNames["configNyTiiManagerMapping"] = "configNyTiiManagerMapping_qa";
	tableNames["configTechDetails"] = "configTechDetails_qa";
	tableNames["createPosition"] = "createPosition_qa";
	tableNames["login"] = "login_qa";
	tableNames["panelistDetails"] = "panelistDetails_qa";
	tableNames["transistionDetails"] = "transistionDetails_qa";
	tableNames["transistionMap"] = "transistionMap_qa";
	tableNames["vendorDetails"] = "vendorDetails_qa";
	tableNames["vendorMapDetails"] = "vendorMapDetails_qa";
	tableNames["vendorTeamDetails"] = "vendorTeamDetails_qa";
	tableNames["waveNyManagerMapping"] = "waveNyManagerMapping_qa";
}

else if (environment === 'prod') {
	tableNames["candidateDetails"] = "candidateDetails";
	tableNames["candidateFeedback"] = "candidateFeedback";
	tableNames["candidateInterview"] = "candidateInterview";
	tableNames["candidatesOfferedLetter"] = "candidatesOfferedLetter";
	tableNames["configDetails"] = "configDetails";
	tableNames["configNyTiiManagerMapping"] = "configNyTiiManagerMapping";
	tableNames["configTechDetails"] = "configTechDetails";
	tableNames["createPosition"] = "createPosition";
	tableNames["login"] = "login";
	tableNames["panelistDetails"] = "panelistDetails";
	tableNames["transistionDetails"] = "transistionDetails";
	tableNames["transistionMap"] = "transistionMap";
	tableNames["vendorDetails"] = "vendorDetails";
	tableNames["vendorMapDetails"] = "vendorMapDetails";
	tableNames["vendorTeamDetails"] = "vendorTeamDetails";
	tableNames["waveNyManagerMapping"] = "waveNyManagerMapping";
}

module.exports = tableNames;