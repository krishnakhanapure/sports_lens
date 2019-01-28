
module.exports = {
	'INSERT_NEW_TEAM': function(formData) {
		console.log("INSERT_NEW_TEAM in queries.js... "+JSON.stringify(formData));

		let sqlsp = `CALL proc_ins_team("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`")`;

		console.log("INSERT_NEW_TEAM call statement... "+sqlsp);

		return sqlsp;
	}

}

module.exports = {
	'INSERT_NEW_PLAYER': function(formData) {
		console.log("INSERT_NEW_PLAYER in queries.js... "+JSON.stringify(formData));

		let sqlsp = `CALL proc_ins_player("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`","`+formData[7]+`")`;

		console.log("INSERT_NEW_PLAYER call statement... "+sqlsp);

		return sqlsp;
	}

}