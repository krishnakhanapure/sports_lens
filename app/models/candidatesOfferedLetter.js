var queryConstant = require('../../config/queries.js');
var tableName = "candidatesOfferedLetter";

/*a schema will have key value pairs corresponding to
table_column_name : form_name_attribute
*/

var candidatesOffer = {
	candidateName:'candidateName',
	technology:'technology',
	level: 'title',
	dateOfOffer:'dor',
	dateOfJoining:'doj',
	nyManager:'nymanager',
	tiiManager:'tiimanager',
	wave:'wname',
	currentCtc:'candidateCTC',
	proposedCtc:'candidatePCTC',
	'hike':'candidatehike',
	phoneNumber:'candidateNumber',
	email:'candidateEmail',
	backupOffer:'backupOffer',
	joined:'joined',
	globalization:'vendorTransition'
}


var extractObject = [], createdBy='Prabhas';

buildQuery = (o) => {
	let i,query;
	let test,dateSplit;
	extractObject = [];
	for (i in candidatesOffer) {
		if(candidatesOffer[i] === 'dor' || candidatesOffer[i] === 'doj'){
			test = o[candidatesOffer[i]].indexOf('/') !== -1;
			if(test){
				dateSplit = o[candidatesOffer[i]].split('/');
				if(dateSplit.length > 0){
					extractObject.push(dateSplit[2]+'-'+dateSplit[0]+'-'+dateSplit[1]);	
				}
				else {
					extractObject.push('');
				}
			}
			else {
				extractObject.push(o[candidatesOffer[i]] || '');
			} 
		} else {
			extractObject.push(o[candidatesOffer[i]] || '');	
		}
		
	}
	return queryConstant.INSERT_OFFER_RELEASED(extractObject, createdBy);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_CANDIDATE_OFFER();
}


module.exports = { buildQuery:buildQuery, buildSelectQuery: buildSelectQuery };