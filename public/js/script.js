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
        document.getElementById('teamLogo').value = data[0]["team_logo"];
        document.getElementById('teamCountry').value = data[0]["country_code"];

        console.log(JSON.stringify(data));
      }
    });
}

