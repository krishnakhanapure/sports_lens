var queryConstant = require('../../config/queries.js');
var tableName = "vendorTeamDetails";

var vendorTeamSchema = {
	vendorName :'vendorName',
	teamName :'teamName',
	nyManager:'nymanager',
}

var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in vendorTeamSchema) {
		extractObject.push(o[vendorTeamSchema[i]] || '');
	}
	return queryConstant.INSERT_VENDOR_TEAM(extractObject, o.createdBy || createdBy);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_ANYTHING(tableName);
}


module.exports = { buildQuery: buildQuery, buildSelectQuery: buildSelectQuery };
