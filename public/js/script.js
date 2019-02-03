var updateTeamName = "";

function generateCode() {
    $.get('/getTeamRandomCode', function(data){
        console.log(data + JSON.stringify(data));
        $('#teamCode').val(data);
    });
}

function checkTeamCodeDuplication(val) {
	console.log("val.. "+val);

    $.ajax({
      type: 'GET',
      data: { codeTest : val },
      url: '/CheckTeamCode',
      success: function(data) {
        console.log(data);
        var key = Object.keys(data)[0];
        if(data[key] === 0) {
        	$('#teamCode').addClass('error-input');
        	$('.error-code').show();

        }else {
        	$('#teamCode').removeClass('error-input');
        	$('.error-code').hide();
        }
      }
    })
}

function checkTeamNameDuplication(val,update) {
    console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { nameTest : val },
      url: '/CheckTeamName',
      success: function(data) {
        console.log(data);

        var key = Object.keys(data)[0];
        if(data[key] === 0) {

          if(update === "update" && updateTeamName.toUpperCase() === val.toUpperCase()) {

            $('#teamName').removeClass('error-input-name');
            $('.error-name').hide();

          }else {

            $('#teamName').addClass('error-input-name');
            $('.error-name').show();

          }

        }else {

        	$('#teamName').removeClass('error-input-name');
        	$('.error-name').hide();
        }
      }
    })
}

var getTeamDetails = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { teamCode : val },
      url: '/getSelectedTeamValues',
      success: function(data) {
        updateTeamName = data[0]["team_name"];
        document.getElementById('teamName').value = data[0]["team_name"];
        document.getElementById('teamCode').value = data[0]["team_code"];
        document.getElementById('coachFirstName').value = data[0]["coach_first_name"];
        document.getElementById('coachLastName').value = data[0]["coach_last_name"];
        document.getElementById('coachCountry').value = data[0]["coach_country"];
        document.getElementById('coachcontractyear').value = data[0]["contract_start"];
        document.getElementById('coachcontractyearend').value = data[0]["contract_end"];
        document.getElementById('teamType').value = data[0]["team_type"];
        
        document.getElementById('teamCountry').value = data[0]["country_code"];

        document.getElementById('teamLogo').value = data[0]["team_logo"];
      }
    });
}

var getTournamentDetails = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { tournamentCode : val },
      url: '/getSelectedTournamentValues',
      success: function(data) {

        document.getElementById('tournamentName').value = data[0]["tournament_name"];
        document.getElementById('tournamentType').value = data[0]["tournament_type"];
        document.getElementById('tournamentCountry').value = data[0]["country_code"];

        $('#tournamentStart').val(data[0][Object.keys(data[0])[4]]);
        $('#tournamentEnd').val(data[0][Object.keys(data[0])[5]]);

        //populate multiselect
        if(data[0]["team_list"] != null) {
          var countryArr = data[0]["team_list"].split(',');
          var strToDisplay = "";
          for(var i=0; i<countryArr.length; i++) {
            countryArr[i] = countryArr[i].slice(1,countryArr[i].lastIndexOf("'"));;

            if(strToDisplay == "")
              strToDisplay += $('#tournamentTeam option[value="'+countryArr[i]+'"]').html();
            else
              strToDisplay += ","+$('#tournamentTeam option[value="'+countryArr[i]+'"]').html();
          }
          $('.filter-option-inner-inner').html(strToDisplay);
          $('#tournamentTeam').val(countryArr);

        }else {
          $('.filter-option-inner-inner').html("Nothing selected");
          $('#tournamentTeam').val("");
        }

      }
    });
}

var getplayerDetails = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { playerCode : val },
      url: '/getSelectedPlayerValues',
      success: function(data) {

        document.getElementById('playerFirstName').value = data[0]["first_name"];
        document.getElementById('playerLastName').value = data[0]["last_name"];
        document.getElementById('battingStyle').value = data[0]["batting_hand"];
        document.getElementById('bowlingStyle').value = data[0]["bowling_style"];
        document.getElementById('teamName').value = data[0]["primary_team_code"];
        document.getElementById('playerCountry').value = data[0]["country_code"];
        document.getElementById('playerStatus').value = data[0]["player_status_flag"];

        $('#playerDOB').val(data[0][Object.keys(data[0])[8]]);

        //populate multiselect
        if(data[0]["team_list"] != null) {
          var countryArr = data[0]["team_list"].split(',');
          var strToDisplay = "";

          for(var i=0; i<countryArr.length; i++) {
            countryArr[i] = countryArr[i].slice(1,countryArr[i].lastIndexOf("'"));;

            if(strToDisplay == "")
              strToDisplay += $('#playerTeams option[value="'+countryArr[i]+'"]').html();
            else
              strToDisplay += ","+$('#playerTeams option[value="'+countryArr[i]+'"]').html();
          }
          $('.filter-option-inner-inner').html(strToDisplay);
          $('#playerTeams').val(countryArr);

        }else {
          $('.filter-option-inner-inner').html("Nothing selected");
          $('#playerTeams').val("");
        }
        document.getElementById('inputGroupFile01').value = data[0]["player_image"];
      }
    });
}
