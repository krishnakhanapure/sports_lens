var queryConstant = require('../../config/queries.js');
var tableName = "candidateDetails";

var candidateDetailsSchema = {
	candidateName :'candidateName',
	technology :'technologyStack',
    nyMgr:'nymanager',
    indManager:'indmanager',
    profile: '',
    level:'title',
    skills:'skills'	
}

var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
	let i,query;
	extractObject = [];
	for (i in candidateDetailsSchema) {
		extractObject.push(o[candidateDetailsSchema[i]] || '');
	}
	
	return queryConstant.INSERT_CANDIDATE_DETAILS(extractObject, createdBy);
}

buildSelectQuery = () => {
	return queryConstant.SELECT_ANYTHING(tableName);
}

reterivePanelists = () =>{
    return queryConstant.SELECT_ANYTHING("panelistDetails");
}

createInterviewMapping = (c,p) =>{
    var r1=[],r2=[], r3=[];
    
    for(var i=0; i< p.length;i++){
        if(c.technologyStack == p[i].technology){
                if(p[i].rounds.length == 1){
                        r1.push(p[i].name);
                }
                if(p[i].rounds.length == 2){
                        r1.push(p[i].name);
                        r2.push(p[i].name);
                        
                }
                if(p[i].rounds.length == 3){
                       r1.push(p[i].name);
                        r2.push(p[i].name);
                        r3.push(p[i].name);
                }
        }
    }

    return [c.candidateName, c.title , c.technologyStack  ,r1, r2 ,r3];
}


module.exports = { buildQuery: buildQuery , buildSelectQuery: buildSelectQuery,reterivePanelists:reterivePanelists,createInterviewMapping:createInterviewMapping};
