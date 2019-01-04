var queryConstant = require('../../config/queries.js');
var tableName = 'createPosition';

/*a schema will have key value pairs corresponding to
table_column_name : form_name_attribute
*/

var openPositionSchema = {
	level:'title',
	technology:'technology',
	jobdescription:'jobDesc',
	addskills: 'skills2',
	nymanager: 'NYMgr',
	wave: 'wname',
	opennumber: 'positionCheck',
	availability: 'availability',
	workday: 'workday',
	greenhouse: 'greenhouse',
	tiimanager: 'tiimanager'
}


var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in openPositionSchema) {
		extractObject.push(o[openPositionSchema[i]] || '');
	}
	return queryConstant.INSERT_OPEN_POSITIONS(extractObject, createdBy);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_OPEN_POSITIONS();
}

module.exports = { buildQuery: buildQuery, buildSelectQuery: buildSelectQuery };









