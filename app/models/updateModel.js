var queryConstant = require('../../config/queries.js');

/*schemas for all tables - to convert from request object to table columns*/

let openPositionsUpdateSchema = { 
  newTechnology: 'technology',
  newTitle: 'level',
  newManager: 'nymanager',
  newJD: 'jobdescription',
  newPositions: 'opennumber',
  newAvailabilty: 'availability',
  newworkday: 'workday',
  newgreenhouse: 'greenhouse'
}

let offeredLetterUpdateSchema = {
	newofferCanName: 'candidateName',
	newofferCanTitle: 'level',
	newofferCanTech: 'technology',
	newOfferRelDate: 'dateOfOffer',
	newofferJoinDate: 'dateOfJoining',
	newofferNyMgr: 'nyManager',
	newOffertiiMgr: 'tiiManager',
	newcandidateCTC: 'currentCtc',
	newcandidatePCTC: 'proposedCtc',
	newcandidatehike: 'hike',
	newcandidateNumber: 'phoneNumber',
	newcandidateofferEmail: 'email',
	backupOffer: 'backupOffer',
	joined: 'joined',
	newvendorTransition:'globalization'
}

let vendorMapUpdateSchema = {
  newCanMapName: 'candidateName',
  newCanMapTech: 'technology',
  newCanMapTitle: 'level',
  newcanvendorMap: 'vendorstaffname',
  newVenNameMap: 'vendorname',
  newVenTeamMap: 'teamname',
  newManagerNameMap: 'vpname',
  newVendortiiNameMap: 'tiimanager'
}

let vendorDetailUpdateSchema = {
	newVendorName: 'vendorStaffName',
  newvMgr: 'nyManager',
  newvName: 'vendorName',
  newvTeam: 'teamName',
  newvTechnology: 'technology' 
}


let vendorTeamUpdateSchema = {
	newvNameTeam: 'vendorName',
  newvTeamName: 'teamName',
  newvManagerTeam: 'nyManager'
}

let userUpdate = {
	newUserName: 'name',
  newUserRole: 'role',
  newUserEmail: 'email'
}


let createdBy = "Prabhas";

var tableMapping = {
	'createPosition': openPositionsUpdateSchema,
	'candidatesOfferedLetter': offeredLetterUpdateSchema,
	'vendorMapDetails': vendorMapUpdateSchema,
	'vendorDetails': vendorDetailUpdateSchema,
	'vendorTeamDetails': vendorTeamUpdateSchema,
	'login': userUpdate,
	'createPosition_qa': openPositionsUpdateSchema,
	'candidatesOfferedLetter_qa': offeredLetterUpdateSchema,
	'vendorMapDetails_qa': vendorMapUpdateSchema,
	'vendorDetails_qa': vendorDetailUpdateSchema,
	'vendorTeamDetails_qa': vendorTeamUpdateSchema,
	'login_qa': userUpdate
}


function buildUpdateQuery(o) {
	console.log(o);
	let i, updateQueryString = '', target;
	let testString;
	target = tableMapping[o.tableName];
	updateQueryString += 'UPDATE `'+o.tableName+'` SET ';
	for (i in o){
		if(i in target){
			if(i === 'newOfferRelDate' || i === 'newofferJoinDate' || i === 'newAvailabilty'){
				if(o[i].indexOf('-') !== -1) {
					testString = "%Y-%m-%d";
				}
				else if(o[i].indexOf('/') !== -1){
					testString = '%m/%d/%Y';
				}
				updateQueryString += '`'+target[i]+'`=STR_TO_DATE("'+o[i]+'","'+testString+'"), '	
			}
			else if (i === 'newcandidateCTC' || i === 'newcandidatePCTC') {
				updateQueryString += '`'+target[i]+'`=TO_BASE64("'+o[i]+'"), ';
			} else {
			 updateQueryString += '`'+target[i]+'`="'+o[i]+'", ';
			}
		}
	}
	updateQueryString += ' `createdBy`="'+(o.createdBy || createdBy)+'" WHERE `positionId`='+o.rowID+''
	return updateQueryString;
}

function deleteRowQuery(o){
	return queryConstant.DELETE_ROW_QUERY_ABSTABLE(o.tableName, o.positionId);
}

module.exports = {buildUpdateQuery: buildUpdateQuery, deleteRowQuery: deleteRowQuery};




