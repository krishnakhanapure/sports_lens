var queryConstant = require('../../config/queries.js');

var userSchema = {
	name :'name',
	email :'email',
	role:'role'
}

var extractObject = [], createdBy="Prabhas";;

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in userSchema) {
		extractObject.push(o[userSchema[i]] || '');
	}
	return queryConstant.INSERT_USER(extractObject,o.createdBy || createdBy);
}



module.exports = { buildQuery: buildQuery };
