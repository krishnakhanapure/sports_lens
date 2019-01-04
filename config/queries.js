var tableNames = require('../config/env.js');

module.exports = {
	'INSERT_OPEN_POSITIONS': function(arr,createdBy) {
		var testString = ((arr[7].indexOf('-') !== -1)?("%Y-%m-%d"):("%m/%d/%Y"));
		return 'INSERT INTO `'+tableNames.createPosition+'` (`level`, `technology`, `jobdescription`, `addskills`, `nymanager`, `wave`, `opennumber`, `availability`, `workday`, `greenhouse`, `createdOn`, `createdBy`, `tiimanager`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", "'+arr[3]+'", "'+arr[4]+'", "'+arr[5]+'", "'+arr[6]+'", STR_TO_DATE("'+arr[7]+'","'+testString+'"), "'+arr[8]+'", "'+arr[9]+'", CURRENT_TIMESTAMP, "'+createdBy+'", "'+arr[10]+'")';
	},
	'SELECT_ANYTHING': function(tableName) {
		return 'SELECT * FROM `'+tableNames[tableName]+'`';
	},
	'TRUNCATE_TABLE': function(tableName) {
		return 'TRUNCATE TABLE `'+tableNames[tableName]+'`';
	},
	'INSERT_OFFER_RELEASED': function(arr, createdBy){
		return 'INSERT INTO `'+tableNames.candidatesOfferedLetter+'` (`candidateName`, `technology`, `level`, `dateOfOffer`, `dateOfJoining`, `nyManager`, `tiiManager`, `wave`, `currentCtc`, `proposedCtc`, `hike`, `phoneNumber`, `email`, `backupOffer`, `joined`, `globalization`, `createdOn`, `createdBy`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", STR_TO_DATE("'+arr[3]+'","%Y-%m-%d"), STR_TO_DATE("'+arr[4]+'","%Y-%m-%d"), "'+arr[5]+'", "'+arr[6]+'", "'+arr[7]+'", TO_BASE64("'+arr[8]+'"), TO_BASE64("'+arr[9]+'"), "'+arr[10]+'", "'+arr[11]+'", "'+arr[12]+'", "'+arr[13]+'", "'+arr[14]+'", "'+arr[15]+'", CURRENT_TIMESTAMP, "'+createdBy+'")';
	},
	'INSERT_VENDOR_DETAILS': function(arr, createdBy) {
		return 'INSERT INTO `'+tableNames.vendorDetails+'` (`vendorStaffName`, `nyManager`, `vendorName`, `teamName`, `technology`, `createdOn`, `createdBy`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", "'+arr[3]+'", "'+arr[4]+'", CURRENT_TIMESTAMP, "'+createdBy+'")'
	},
	'INSERT_MULTIPLE_VENDOR': function(mult) {
		return 'INSERT INTO `'+tableNames.vendorDetails+'` (`vendorStaffName`, `nyManager`, `vendorName`, `teamName`, `technology`, `leaveDate1`, `leaveDate2`, `createdOn`, `createdBy`) VALUES '+ mult;
	},
	'INSERT_VENDOR_MAP': function(arr, createdBy){
		return 'INSERT INTO `'+tableNames.vendorMapDetails+'` (`candidateName`, `technology`, `level`, `vpname`, `vendorname`, `vendorstaffname`, `teamname`, `tiimanager`, `createdOn`, `createdBy`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", "'+arr[3]+'", "'+arr[4]+'", "'+arr[5]+'", "'+arr[6]+'", "'+arr[7]+'", CURRENT_TIMESTAMP, "'+createdBy+'")';
	},
	'INSERT_VENDOR_TEAM': function(arr, createdBy) {
		return 'INSERT INTO `'+tableNames.vendorTeamDetails+'` (`vendorName`, `teamName`, `nyManager`, `createdOn`, `createdBy`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", CURRENT_TIMESTAMP, "'+createdBy+'")';
	},
	'GET_OPEN_POSITION_COUNT': function(userRole,vpName){
		if(userRole && userRole==='user'){
			return 'SELECT SUM(opennumber) as x FROM '+tableNames.createPosition+' where nymanager="'+vpName+'"';
		}
		else
		 return 'SELECT SUM(opennumber) as x FROM '+tableNames.createPosition;
	},
	'GET_COUNT_OFFER_RELEASED_WITH_BACKUP': function(userRole,vpName){
		if(userRole && userRole==='user') {
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where backupOffer="Yes" and nyManager="'+vpName+'"';
		}
		else
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where backupOffer="Yes"';
	},
	'GET_COUNT_OFFER_RELEASED_WITHOUT_BACKUP': function(userRole,vpName){
		if(userRole && userRole==='user') {
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where backupOffer="No" and nyManager="'+vpName+'"';
		}
		else
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where backupOffer="No"';
	},
	'GET_OFFER_WHO_JOINED': function(userRole,vpName){
		if(userRole && userRole==='user') {
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where joined="Yes" and nyManager="'+vpName+'"';
		}
		else
			return 'select count(candidateName) as x from '+tableNames.candidatesOfferedLetter+' where joined="Yes"';
	},
	'GET_OPEN_POSITION_BY_TECHNOLOGY': function(userRole,vpName) {
		if(userRole && userRole==='user') {
			return 'select technology, sum(opennumber) as sum from '+tableNames.createPosition+' where nymanager="'+vpName+'" group by technology'
		}
		else 
			return 'select technology, sum(opennumber) as sum from '+tableNames.createPosition+' group by technology';
	},
	'GET_COUNT_OFFER_RELEASED_JOINED': function(userRole,vpName){
		if(userRole && userRole==='user') {
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' where joined="Yes" and nyManager="'+vpName+'" group by technology';
		}
		else 
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' where joined="Yes" group by technology';
	},
	'GET_OPEN_POSITION_BY_VP_BY_TECHNOLOGY': function(userRole,vpName){
		if(userRole && userRole==='user'){
			return 'SELECT sum(opennumber) as sum, technology, nymanager from '+tableNames.createPosition+' where nymanager="'+vpName+'" group by nymanager, technology'
		}
		else
			return 'SELECT sum(opennumber) as sum, technology, nymanager from '+tableNames.createPosition+' group by nymanager, technology';
	}, 
	'GET_OFFER_FOR_TECHNOLOGY_WITHOUT_BACKUP': function(userRole,vpName){
		if(userRole && userRole==='user'){
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' where backupOffer="No" and nyManager="'+vpName+'" group by technology';
		}
		else
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' where backupOffer="No" group by technology';
	},
	'GET_ALL_OFFER': function(userRole,vpName){
		if(userRole && userRole==='user'){
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' and nyManager="'+vpName+'" group by technology';
		}
		else
			return 'select technology, count(candidateName) as offerCount from '+tableNames.candidatesOfferedLetter+' group by technology';
	},
	'GET_LEVEL_BY_VP_BY_TECHNOLOGY': function(){
		return 'select level, opennumber, nymanager, technology from '+tableNames.createPosition;
	},
	'INSERT_CANDIDATE_DETAILS':function(arr, createdBy){
		return 'INSERT INTO `'+tableNames.candidateDetails+'` (`candidateName`, `technology`, `nyManager`, `tiiManager`, `profile`,`level`,`createdBy`,`createdOn`,`skills`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", "'+arr[3]+'", "'+arr[4]+'", "'+arr[5]+'", "'+createdBy+'", CURRENT_TIMESTAMP, "'+arr[6]+'")';
	},
	'INSERT_CANDIDATE_FEEDBACK':function(arr, createdBy) {
		return 'INSERT INTO `'+tableNames.candidateFeedback+'` (`candidateName`, `r1feedback`, `r1communication`,`r1learn`,`r1accomplishments`, `r1attitude`,`r1hire`,`timestamp`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", "'+arr[3]+'", "'+arr[4]+'", "'+arr[5]+'", "'+arr[6]+'" ,CURRENT_TIMESTAMP)';
	},
	'INSERT_USER': function(arr, createdBy) {
		return 'INSERT INTO `'+tableNames.login+'` (`name`, `email`, `role`, `createdOn`, `updatedAt`, `createdBy` ) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, "'+createdBy+'" )'
	},
	'UPDATE_CONFIG': function(arr, createdBy) {
		return 'INSERT INTO `'+tableNames.configDetails+'` (`title`, `nyManager`, `tiiManager`, `vendorName`, `availability`, `createdOn`, `createdBy`, `positionId`) VALUES ("'+arr[0]+'","'+arr[1]+'","'+arr[2]+'","'+arr[3]+'","'+arr[4]+'",CURRENT_TIMESTAMP, "'+createdBy+'", 1) ON DUPLICATE KEY UPDATE `title`="'+arr[0]+'",`nyManager`="'+arr[1]+'",`tiiManager`="'+arr[2]+'", `vendorName`="'+arr[3]+'",`availability`="'+arr[4]+'", `createdOn`=CURRENT_TIMESTAMP,`createdBy`="'+createdBy+'"';
	},
	'ADD_TECHNOLOGY': function(str) { 
		return 'INSERT INTO `'+tableNames.configTechDetails+'` (`technology`, `skills`, `createdOn`, `createdBy`) VALUES '+str;
	},
	'DELETE_TECHNOLOGY': function(str) {
		return 'DELETE FROM '+tableNames.configTechDetails+' WHERE technology in ('+ str+')';
	},
	'INSERT_MANAGER_MAP': function(str) {
		return 'INSERT INTO `'+tableNames.configNyTiiManagerMapping+'` (`nyManager`, `technology`, `tiiManager`, `createdOn`, `createdBy`) VALUES ' + str;
	},
	'INSERT_WAVE_MAP': function(str) {
		 return 'INSERT INTO `'+tableNames.waveNyManagerMapping+'` (`nyManager`, `wave`, `createdOn`, `createdBy`) VALUES ' + str;
	},
	'INSERT_PANEL_DETAILS':function(panels) {
        return 'INSERT INTO `'+tableNames.panelistDetails+'` (`name`,`level`, `technology`,`skills`, `rounds`) VALUES' + panels;
    },
    'INSERT_CANDIDATE_MAPPING':function(maps) {
        return 'INSERT INTO `'+tableNames.candidateInterview+'` (`name`,`level`, `technology`,`round1`, `round2`,`round3`) VALUES' + maps;
    },
     'UPDATE_CANDIDATE_FEEDBACK_2': function(arr, createdBy ,name) {
        return 'UPDATE `'+tableNames.candidateFeedback+'` SET `r2feedback`= "'+arr[0]+'", `r2communication`= "'+arr[1]+'" ,`r2learn`= "'+arr[2]+'" , `r2accomplishments`= "'+arr[3]+'" , `r2attitude`= "'+arr[4]+'" , `r2hire`= "'+arr[5]+'" , `timestamp` = CURRENT_TIMESTAMP WHERE `candidateName` = "'+name+'"';
    },
		'UPDATE_CANDIDATE_FEEDBACK_3': function(arr, createdBy ,name) {
        return 'UPDATE `'+tableNames.candidateFeedback+'` SET `r3feedback`= "'+arr[0]+'", `r3communication`= "'+arr[1]+'" ,`r3learn`= "'+arr[2]+'" , `r3accomplishments`= "'+arr[3]+'" , `r3attitude`= "'+arr[4]+'" , `r3hire`= "'+arr[5]+'" , `timestamp` = CURRENT_TIMESTAMP WHERE `candidateName` = "'+name+'"';
    },
    'VALIDATE_USER':function(email){
      return 'SELECT * FROM `'+tableNames.login+'` WHERE email="'+email+'"';
    },
    'NY_MGR_BASED_ON_TECHNOLOGY': function(){
    	return 'SELECT nymanager, technology from '+tableNames.createPosition;
    },
    'OFFERED_AND_JOINED': function(){
    	return 'select * from '+tableNames.candidatesOfferedLetter+' where joined="Yes"';
    },
    'SELECT_CANDIDATE_OFFER': function(){
    	return 'select candidateName, technology, level, DATE_FORMAT(dateOfOffer,"%m/%d/%Y") as dateOfOffer, DATE_FORMAT(dateOfJoining,"%m/%d/%Y") as dateOfJoining, nyManager, tiiManager, wave, FROM_BASE64(currentCtc) as currentCtc, FROM_BASE64(proposedCtc) as proposedCtc, hike, phoneNumber, email, backupOffer, joined, globalization, positionId from '+tableNames.candidatesOfferedLetter;
    },
    'DELETE_ROW_QUERY': function(tableName, positionId){
    	return 'DELETE FROM `'+tableNames.tableName+'` WHERE positionId="'+positionId+'"';
    },
    'DELETE_ROW_QUERY_ABSTABLE': function(tableName, positionId){
    	return 'DELETE FROM `'+tableName+'` WHERE positionId="'+positionId+'"';
    },
    'SELECT_OPEN_POSITIONS': function() {
    	return 'SELECT `level`, `technology`, `jobdescription`, `addskills`, `nymanager`, `wave`, `opennumber`, DATE_FORMAT(`availability`,"%m/%d/%Y") as availability, `workday`, `greenhouse`, `createdOn`, `createdBy`, `tiimanager`, `positionId` FROM `'+tableNames.createPosition+'`';
    }

}