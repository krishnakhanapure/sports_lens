var queryConstant = require('../../config/queries.js');

var newUserSPSchema = {
	username :'username',
	firstName: 'firstName',
	lastname :'lastname',
    email:'email',
    password :'password',
    contactnumber :'contactnumber'

}

var extractObject = [];

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in newUserSPSchema) {
		extractObject.push(o[newUserSPSchema[i]] || '');
	}
	
	return queryConstant.INSERT_NEW_USER(extractObject);
}

module.exports = { buildQuery: buildQuery };
