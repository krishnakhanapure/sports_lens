var queryConstant = require('../../config/queries.js');
var tableName = "candidateInterview";


var createdBy = 'Prabhas';

buildQuery = (o) => {
	let addMultipleRows =
	 '("'+o[0]+'", "'+o[1]+'", "'+o[2]+'", "'+o[3]+'", "'+o[4]+'", "'+o[5]+'")';
	return queryConstant.INSERT_CANDIDATE_MAPPING(addMultipleRows);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_ANYTHING(tableName);
}


module.exports = { buildQuery: buildQuery ,buildSelectQuery: buildSelectQuery};

