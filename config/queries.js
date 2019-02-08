
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


	'INSERT_NEW_MATCH': function (formData) {

		let sqlsp = `CALL proc_ins_match('`+formData[0]+`','`+formData[1]+`','`+formData[2]+`','`+formData[3]+`','`+formData[4]+`','`+formData[5]+`','`+formData[6]+`','`+formData[7]+`','`+formData[8]+`','`+formData[9]+`','`+formData[10]+`','`+formData[11]+`','`+formData[12]+`')`;

		console.log("INSERT_NEW_MATCH call statement... "+sqlsp);

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

	'UPDATE_NEW_PLAYER': function(formData) {

		let sqlsp = `CALL proc_upd_player("`+formData[0]+`","`+formData[1]+`","`+formData[2]+`","`+formData[3]+`","`+formData[4]+`","`+formData[5]+`","`+formData[6]+`","`+formData[7]+`","`+formData[8]+`","`+formData[9]+`","`+formData[10]+`")`;

		console.log("UPDATE_NEW_PLAYER call statement... "+sqlsp);

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

	'GET_PLAYER_STATUS': function() {
		let sqlQuery = "SELECT player_status_flag, player_status_descr FROM player_status_l";
		return sqlQuery;
		
	},

	'GET_SELECTED_TEAM_VALS': function(teamId) {
		let sqlQuery = "SELECT team_name, team_code, coach_first_name, coach_last_name, coach_country, contract_start, contract_end, team_type, team_logo, country_code FROM team, coach_history WHERE team.coach_id = coach_history.coach_id AND team.team_id = '"+teamId+"'";
		return sqlQuery;
	},

	'GET_PLAYERS_NAMES': function() {
		let sqlQuery = "SELECT player_id, CONCAT(first_name,' ',last_name) AS player_name FROM player";
		return sqlQuery;
	},

	'GET_SELECTED_TOURNAMENT_VALS': function(tournamentId) {
		let sqlQuery = "SELECT t.tournament_name, t.tournament_type, t.country_code, GROUP_CONCAT(CONCAT('''', tt.team_code , '''' )) as team_list, DATE_FORMAT(t.start_date,'%Y-%m-%d'), DATE_FORMAT(t.end_date,'%Y-%m-%d') FROM tournament t, tournament_team tt WHERE t.tournament_id = tt.tournament_id AND t.tournament_id = '"+tournamentId+"'";
		return sqlQuery;
	},

	'GET_SELECTED_PLAYER_VALS': function(playerId) {
		let sqlQuery = "SELECT p.first_name, p.last_name, p.batting_hand, p.bowling_style, p.primary_team_code, p.player_status_flag, GROUP_CONCAT(CONCAT('''', pt.team_code , '''' )) as team_list, p.player_image, DATE_FORMAT(p.dob,'%Y-%m-%d'), p.country_code FROM player p, player_team pt WHERE p.player_id = pt.player_id AND p.player_id = '"+playerId+"'";
		return sqlQuery;
	},

	'GET_PLAYERS_FOR_SELECTED_TEAMS': function(teamCode) {
		let sqlQuery = "select p.player_id ,CONCAT(p.first_name,' ',p.last_name) AS player_name FROM player p, player_team pt WHERE p.player_id = pt.player_id AND p.player_status_flag = 'A'AND pt.team_code = '"+teamCode+"'";

		return sqlQuery;
	},

	'GET_TEAMS_FOR_SELECTED_TOURNAMENT': function(tournamentCode) {
		let sqlQuery = "SELECT t.team_code, t.team_name FROM team t, tournament_team tt WHERE t.team_code = tt.team_code AND tt.tournament_id =  '"+tournamentCode+"'";

		console.log(sqlQuery);

		return sqlQuery;
	},

	'GET_MATCHES_FROM_TOURNAMENT': function(tournamentCode) {
		let sqlQuery = "SELECT mm.match_id, CONCAT(mm.match_form_code,' ',(SELECT @curRank := @curRank + 1 AS match_order FROM match_master mm2, (SELECT @curRank := 0) r WHERE mm2.tournament_id = t.tournament_id AND mm.match_id = mm2.match_id ORDER BY match_date),' of ',(SELECT count(match_id) FROM match_master mm1 WHERE mm1.tournament_id = t.tournament_id),' - ',t.tournament_name) AS match_gen_name FROM match_master mm, tournament t WHERE mm.tournament_id = t.tournament_id AND t.tournament_id ='"+tournamentCode+"'";

		console.log(sqlQuery);

		return sqlQuery;
	},

	'GET_MATCHES_DETAILS': function(MatchCode) {
		let sqlQuery = "SELECT team_a, team_b, match_form_code, DATE_FORMAT(match_date,'%Y-%m-%d'), stadium_name, stadium_city, stadium_country, umpire_a, umpire_b, referee_name, analyst_name, playing_squad_json FROM match_master mm, stadium s WHERE s.stadium_id = mm.stadium_id AND mm.match_id ='"+MatchCode+"'";

		console.log(sqlQuery);

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


