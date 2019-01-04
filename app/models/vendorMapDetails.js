var queryConstant = require('../../config/queries.js');
var tableName = "vendorMapDetails";

var vendorMapSchema = {
	candidateName :'candidateList',
	technology :'candidateTechnology',
	level:'candidateTitle',
	vpname: 'nymanager',
	vendorname: 'vendorName',
	vendorstaffname:'vendorStaff',
	teamname:'teamName',
	tiimanager:'tiimanager',
}

var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in vendorMapSchema) {
		extractObject.push(o[vendorMapSchema[i]] || '');
	}
	
	return queryConstant.INSERT_VENDOR_MAP(extractObject, createdBy);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_ANYTHING(tableName);
}


module.exports = { buildQuery: buildQuery, buildSelectQuery: buildSelectQuery };
