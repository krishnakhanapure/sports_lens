var queryConstant = require('../../config/queries.js');
var tableName = 'vendorDetails';

var vendorSchema = {
	vendorStaffName :'name',
	nyManager :'nymanager',
	vendorName:'vendorName',
	teamName: 'teamName',
	technology: 'technology'
}

var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in vendorSchema) {
		extractObject.push(o[vendorSchema[i]] || '');
	}
	return queryConstant.INSERT_VENDOR_DETAILS(extractObject, createdBy);
}

buildMassQuery = (o) => {
	let str='',i,count = Object.keys(o).filter((v,i) => v.indexOf('name') !== -1 ).length;
	let dateString = (o["ldone1"].indexOf('-') !== -1)?"%Y-%m-%d":"%m/%d/%Y";
	for(i=1; i<= count; i++) {
		str += (' ("'+o["name"+count]+'","'+o["nymanager"+count]+'","'+o["vendorName"+count]+'","'+o["teamName"+count]+'","'+o["technology"+count]+'", STR_TO_DATE("'+o["ldone"+count]+'","'+dateString+'"), STR_TO_DATE("'+o["ldtwo"+count]+'","'+dateString+'"), CURRENT_TIMESTAMP, "'+createdBy+'") ' + (i===count?'':','));
	}
	return queryConstant.INSERT_MULTIPLE_VENDOR(str);
}


buildSelectQuery = () => {
	return queryConstant.SELECT_ANYTHING(tableName);
}



module.exports = { buildQuery: buildQuery, buildSelectQuery: buildSelectQuery, buildMassQuery: buildMassQuery };
