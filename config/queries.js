
module.exports = {
	'INSERT_NEW_TEAM': function(formData) {

		let sqlsp = `CALL proc_ins_team("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`","`+formData[7]+`","`+formData[8]+`")`;

		console.log("INSERT_NEW_TEAM call statement... "+sqlsp);

		return sqlsp;
	},

	'INSERT_NEW_PLAYER': function(formData) {

		let sqlsp = `CALL proc_ins_player("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`","`+formData[7]+`","`+formData[8]+`")`;

		console.log("INSERT_NEW_PLAYER call statement... "+sqlsp);

		return sqlsp;
	},

	'INSERT_NEW_TOURNAMENT': function (formData) {

		let sqlsp = `CALL proc_ins_tournament("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`")`;

		console.log("INSERT_NEW_TOURNAMENT call statement... "+sqlsp);

		return sqlsp;
	},

	'UPDATE_TEAM_VALUES': function(formData) {

		let sqlsp = `CALL proc_upd_team("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`","`+formData[7]+`","`+formData[8]+`","`+formData[9]+`","`+formData[10]+`")`;

		console.log("UPDATE_TEAM_VALUES call statement... "+sqlsp);

		return sqlsp;
	},

	'UPDATE_TOURNAMENT_VALUES': function(formData) {

		let sqlsp = `CALL proc_upd_tournament("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`")`;

		console.log("UPDATE_TOURNAMENT_VALUES call statement... "+sqlsp);

		return sqlsp;
	},

	'GET_TEAM_NAMES_CODES': function() {

		let sqlQuery = "select distinct team_name,team_code,team_id from team";
		console.log("GET_TEAM_NAMES_CODES.. "+sqlQuery);
		return sqlQuery;
	},

	'GET_BOWLING_STYLES': function() {

		let sqlQuery = "select bowl_style_abbr,bowl_style_descr from bowling_style_l";
		return sqlQuery;
	},

	'GET_COUNTRIES': function() {

		let sqlQuery = "select country_code,country_name from country_l";
		return sqlQuery;
	},

	'GET_TEAM_RANDOM_CODES': function() {

		let sqlsp = `SELECT func_generate_team_code()`;
		return sqlsp;
	},

	'GET_TOURNAMENT_NAMES': function() {
		let sqlQuery = "SELECT tournament_id,tournament_name FROM tournament";
		return sqlQuery;
	},

	'GET_MATCH_FORMATS': function() {
		let sqlQuery = "SELECT match_form_code,match_form_name FROM match_form_l";
		return sqlQuery;
		
	},

	'GET_SELECTED_TEAM_VALS': function(teamId) {
		let sqlQuery = "SELECT team_name, team_code, coach_first_name, coach_last_name, coach_country, contract_start, contract_end, team_type, team_logo, country_code FROM team, coach_history WHERE team.coach_id = coach_history.coach_id AND team.team_id = '"+teamId+"'";
		return sqlQuery;
	},

	'GET_PLAYERS_NAMES': function() {
		let sqlQuery = "SELECT tournament_id,tournament_name FROM tournament";
		return sqlQuery;
	},

	'GET_SELECTED_TOURNAMENT_VALS': function(tournamentId) {
		let sqlQuery = "SELECT t.tournament_name, t.tournament_type, t.country_code, GROUP_CONCAT(CONCAT('''', tt.team_code , '''' )) as team_list, DATE_FORMAT(t.start_date,'%Y-%m-%d'), DATE_FORMAT(t.end_date,'%Y-%m-%d') FROM tournament t, tournament_team tt WHERE t.tournament_id = tt.tournament_id AND t.tournament_id = '"+tournamentId+"'";
		return sqlQuery;
	},

	'CHECK_TEAM_CODE_DUPLICATION': function(codeToTest) {

		let sqlsp = `SELECT func_chk_team_code("`+codeToTest+`")`;
		return sqlsp;
	},

	'CHECK_TEAM_NAME_DUPLICATION': function(nameToTest) {

		let sqlsp = `SELECT func_chk_team_name("`+nameToTest+`")`;
		return sqlsp;
	}

}


