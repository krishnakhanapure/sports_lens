
module.exports = {
	'INSERT_NEW_TEAM': function(formData) {
		console.log("in queries.js... "+JSON.stringify(formData));

		let sqlsp = `CALL proc_ins_team("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`")`;

		console.log("call statement... "+sqlsp);

		return sqlsp;
	}

}