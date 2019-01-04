var queryConstant = require('../../config/queries.js');
var tableName = "panelistDetails";

var candidateDetailsSchema = {
	name:"name",
	level :'level',
	technology :'technology',
	skills:"skills",
	rounds:"rounds"   
}

var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
o = Array(o);
	let addMultipleRows = o.map((v,i) => {
        console.log(i);
		return '("'+v.name+'", "'+v.level+'", "'+v.technology+'", "'+v.skills+'", "'+v.rounds+'")';
	}).join(',');

	return queryConstant.INSERT_PANEL_DETAILS(addMultipleRows);
}

module.exports = { buildQuery: buildQuery };

