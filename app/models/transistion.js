var tableNames = require('../../config/env.js');

var tableName = tableNames.transistionMap;

function INSERT_TRANSISTION_MAP(arr){
  return 'INSERT INTO `'+tableNames.transistionMap+'` (`nyVp`, `vendor`, `project`, `startDate`, `endDate`, `application`, `teamMembers`) VALUES ("'+arr[0]+'","'+arr[1]+'", "'+arr[2]+'","'+arr[3]+'","'+arr[4]+'","'+arr[5]+'","'+arr[6]+'")'
}


function SELECT_ANYTHING(tableName) {
		return 'SELECT * FROM `'+tableNames[tableName]+'`';
}

var transistionSchema = {
	nyMgr :'nyVp',
	vendor :'vendor',
  project:'project',
  startDate:'startDate',
  endDate: 'endDate',
  application:'application',
  teamMembers:'teamDetails'	
}


var createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in transistionSchema) {
		extractObject.push(o[transistionSchema[i]] || '');
	}


	return INSERT_TRANSISTION_MAP(extractObject);
}


selectVendorDetails = () => {
	return SELECT_ANYTHING("vendorTeamDetails");
}

selectMAPPING = () => {
	return SELECT_ANYTHING("transistionMap");
}


exposeQueryData = (o) =>{
		updateQuery();
	var detailsArray = [];
		for (var i =0 ;i < o.name.length ; i++){
			var tempArr=[];
				tempArr.push(o.nyVp,o.vendor,o.project,o.application,o.name[i],o.classroomSession[i],o.Shadowing[i],o.reverseShadowing[i],o.Evaluation[i],o.qaReview[i],o.Documentation[i],o.ktSignOff[i]);
				detailsArray.push(tempArr);
			 tempArr=[];			
		}
		return detailsArray;
	
}

updateQuery = (o) =>{
				let arr =[1,2,3,4,5,6,7,7,8,8,8,6],name= "sad";

var pp ='';
for(var i= 0;i<2;i++){
	 pp += 'UPDATE `'+tableNames.candidateFeedback+'` SET `nyVp`= "'+arr[0]+'", `vendor`= "'+arr[1]+'" ,`project`= "'+arr[2]+'" , `application`= "'+arr[3]+'" , `name`= "'+arr[4]+'" , `classroomSession`= "'+arr[5]+'" , `Shadowing`= "'+arr[6]+'" , `reverseShadowing`= "'+arr[7]+'" , `Evaluation`= "'+arr[8]+'" , `qaReview`= "'+arr[9]+'", `Documentation`= "'+arr[10]+'" ,  `ktSignOff`= "'+arr[11]+'"  WHERE `candidateName` = "'+name+'";';
}
     

console.log("pp");
console.log(pp);

}


module.exports = { buildQuery: buildQuery , selectVendorDetails: selectVendorDetails ,selectMAPPING: selectMAPPING, exposeQueryData: exposeQueryData};

