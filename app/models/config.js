var queryConstant = require('../../config/queries.js');
let mainConfig = 'configDetails', techConfig = 'configTechDetails', nyTiiManagerMapping = 'configNyTiiManagerMapping';
let waveConfig = 'waveNyManagerMapping';

let configString = [], configArray = [], createdBy='Prabhas';

let mainConfigSchema = {
	title:'titleConfig',
	nyManager:'NYMgrConfig',
	tiiManager:'OfMgrConfig',
	vendorName: 'vendorConfig',
	availability: 'availConfig'
}

let fieldOrder = ['title', 'nyManager','tiiManager','vendorName','availability'];


let techConfigSchema = {
	technology: 'techConfig',
	skills: 'notpresent'
}

let managerMappingSchema = ['nyManager','technology','tiiManager','createdOn','createdBy'];

let waveMappingSchema = ['nyManager', 'wave', 'createdOn', 'createdBy'];

let buildSelectQuery = (t) => {
	return queryConstant.SELECT_ANYTHING(t);
}

let buildConfigString = (arr1) => {
	configString = [];
	let i, obj, o = arr1[0], techConfigString='';
	for (i in o) {
		obj = (i in mainConfigSchema) ? {
			[mainConfigSchema[i]]:o[i]
		}:null;

		if(obj) {
			configString.push(obj);
		}
	}
	return configString;
}

let buildUpdateConfigQuery = (o) => {
	configArray = [];
	fieldOrder.forEach((v,i) => {
		configArray.push(o[mainConfigSchema[v]])
	});

	return queryConstant.UPDATE_CONFIG(configArray,o.createdBy || createdBy);
}

let addTechConfig = (newTechConfig,createdByL) => {
	let addMultipleTech = newTechConfig.map((v,i) => {
		return '("'+v.technology+'", "'+((v.skills)?v.skills:'')+'", CURRENT_TIMESTAMP, "'+(createdByL || createdBy)+'")';
	});
	return queryConstant.ADD_TECHNOLOGY(addMultipleTech.join(' , '));
}

let truncateTechMap = () => {
	return queryConstant.TRUNCATE_TABLE(techConfig);
}

let truncateManagerMap = () => {
	return queryConstant.TRUNCATE_TABLE(nyTiiManagerMapping);
}

let truncateWaveMap = () => {
	return queryConstant.TRUNCATE_TABLE(waveConfig);
}



let addManagerConfig = (m,c1) => {
	var c = m.map(function(v1,i1){
		var str= '';
		str += '(';
		managerMappingSchema.forEach(function(v,i) {
			if(v in v1) {
				str += ' "'+v1[v]+'",'
			}
			else if(v === 'createdOn') {
				str += ' CURRENT_TIMESTAMP,'
			}
			else if(v === 'createdBy') {
				console.log(c1);
				str += ' "'+(c1 || createdBy)+'",'	
			}
			else {
				str += '"",'
			}
		});

		str = str.substring(0,str.length-1);
		str += ')'; 
		return str;
	}).join(' , ');
	return queryConstant.INSERT_MANAGER_MAP(c);
}


let addWaveConfig = (w,c1) => {
	var c = w.map(function(v1,i1){
		var str= '';
		str += '(';
		waveMappingSchema.forEach(function(v,i) {
			if(v in v1) {
				str += ' "'+v1[v]+'",'
			}
			else if(v === 'createdOn') {
				str += ' CURRENT_TIMESTAMP,'
			}
			else if(v === 'createdBy') {
				str += ' "'+(c1 || createdBy)+'",'	
			}
			else {
				str += '"",'
			}
		});

		str = str.substring(0,str.length-1);
		str += ')'; 
		return str;
	}).join(' , ');
	
	return queryConstant.INSERT_WAVE_MAP(c);
}



module.exports = {buildSelectQuery: buildSelectQuery, mainConfig: mainConfig, techConfig:techConfig, nyTiiManagerMapping:nyTiiManagerMapping, buildConfigString: buildConfigString, buildUpdateConfigQuery: buildUpdateConfigQuery, addTechConfig: addTechConfig, truncateTechMap:truncateTechMap, addManagerConfig:addManagerConfig, truncateManagerMap:truncateManagerMap, truncateWaveMap:truncateWaveMap, addWaveConfig:addWaveConfig};




