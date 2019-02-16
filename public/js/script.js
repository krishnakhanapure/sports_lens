var updateTeamName = "";
let checkSecCall = false;

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

var selectTeams = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { tournamentCode : val },
      url: '/getTeamsForSelectedTournament',
      success: function(data) {

        var teamSection = '<option value="">--Select--</option>';

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];
            
            teamSection += '<option value="'+val.team_code+'">'+val.team_name+'</option>';

          }
        }
          $('#teamOne').html(teamSection);
          $('#teamtwo').html(teamSection);
      
      }
    });
}

var fetchPlayer = (team, val, fromUpdate, jsonList) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { teamCode : val },
      url: '/getPlayersForSelectedTeam',
      success: function(data) {

        var playerSection = "";

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];
            
            playerSection += '<tr for='+val.player_id+'><td>'+val.player_name+'</td><td><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input captainCheck" onclick="checkedValidation(this);" type="radio" id="" value="'+val.player_id+'" capRadio="'+val.player_id+'" name="captionselect'+team+'"></label></div></td><td><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input vcCheck" onclick="checkedValidation(this);" type="radio" id="" value="'+val.player_id+'" vcapRadio="'+val.player_id+'" name="vicecaptionselect'+team+'"></label></div></td><td><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input wkCheck" type="radio" id="" onclick="checkedValidation(this);" wkRadio="'+val.player_id+'" value="'+val.player_id+'" name="wicketkeeperselect'+team+'"></label></div></td><td><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input subsCheck" type="checkbox" id="" onclick="playerValidation(this);" subsCheck="'+val.player_id+'" value="substitute1" name="substitue'+team+'"></label></div></td><td><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input playCheck" type="checkbox" id="" onclick="playerValidation(this);" playCheck="'+val.player_id+'" value="playing1" name="playing'+team+'"></label></div></td></tr>'

          }
        }

        if(team == "one"){
          $('.player-list-body-one').html(playerSection);

        }else {
          $('.player-list-body-two').html(playerSection);

        }

        if(fromUpdate == true) {

          let eachTeamList = "";
          let teamArr = "";

          if(team == "one"){
            teamArr = "player-list-body-one";
            eachTeamList = jsonList["teams"]["teama"]["players"];
          }

          else{
            teamArr = "player-list-body-two";
            eachTeamList = jsonList["teams"]["teamb"]["players"];
          }

          for (var key in eachTeamList) {
             if (eachTeamList.hasOwnProperty(key)) {
                let playerID = eachTeamList[key].playerId;

                if(eachTeamList[key].cap == "Y"){
                  $('.'+teamArr+' input[capradio="'+playerID+'"]').prop('checked',true);

                }if(eachTeamList[key].vcap == "Y") {
                  $('.'+teamArr+' input[vcapradio="'+playerID+'"]').prop('checked',true);

                }if(eachTeamList[key].wk == "Y") {
                  $('.'+teamArr+' input[wkradio="'+playerID+'"]').prop('checked',true);

                }

                if(eachTeamList[key].subsPlay == "play") {
                  $('.'+teamArr+' input[playcheck="'+playerID+'"]').prop('checked',true);
                  
                }else {
                  $('.'+teamArr+' input[subscheck="'+playerID+'"]').prop('checked',true);

                }
             }
          }
        } 

        if(!checkSecCall){
          fetchPlayer('two',jsonList["teams"]["teamb"].teamCode, true, jsonList);
          checkSecCall = true;
        }
      }
    });
}

var createJson = () => {

  if($('input[name="playingone"]:checked').length < 11 ) {
    alert("Please add 11 playing players for Team 1.");
    return false;

  }
  if($('input[name="playingtwo"]:checked').length < 11) {
    alert("Please add 11 playing players for Team 2.");
    return false;
  }

  if($('input[name="captionselectone"]:checked').length == 0 ) {
    alert("Please Select a Caption for Team 1.");
    return false;
  }

  if($('input[name="captionselecttwo"]:checked').length == 0) {
    alert("Please Select a Caption for Team 2.");
    return false;
  }

  if($('input[name="vicecaptionselectone"]:checked').length == 0) {
    alert("Please Select a Vice Caption for Team 1.");
    return false;
  }

  if($('input[name="vicecaptionselecttwo"]:checked').length == 0) {
    alert("Please Select a Vice Caption for Team 2.");
    return false;
  }

  if($('input[name="wicketkeeperselectone"]:checked').length == 0) {
    alert("Please Select a Wicket Keeper for Team 1.");
    return false;
  }

  if($('input[name="wicketkeeperselecttwo"]:checked').length == 0) {
    alert("Please Select a Wicket Keeper for Team 2.");
    return false;
  }
   

  var jsonStr = '{"teams": {"teama": {"teamCode": "'+$('#teamOne').val()+'","players": [';
  var getCaptStat = $("input[name='captionselect']:checked").val();
  var getVCaptStat = $("input[name='vicecaptionselect']:checked").val();
  var getWKStat = $("input[name='wicketkeeperselect']:checked").val();
  var getSubsStat = "";
  var getPlayStat = "";
  var finalJSON = "";

  var playerSectionArr = ['player-list-body-one', 'player-list-body-two'];

  for(var j=0; j<playerSectionArr.length; j++) {
      $('.'+playerSectionArr[j]+' tr').each(function(e){

          var capCheck = "", VCCheck = "", WKCheck = "" , isSubsPlay = "", idPlay = "";

          if($($(this.childNodes[1]).find("input")).is(":checked")) {
            capCheck = "Y";

          }
          if($($(this.childNodes[2]).find("input")).is(":checked")) {
            VCCheck = "Y";

          } 
          if($($(this.childNodes[3]).find("input")).is(":checked")) {
            WKCheck = "Y";

          }

          if($($(this.childNodes[4]).find("input")).is(":checked")) {
            isSubsPlay = "subs";

          }else if($($(this.childNodes[5]).find("input")).is(":checked")){
            isSubsPlay = "play";

          }else {
            isSubsPlay = "";
          }

          if(isSubsPlay != "") {
            // if(e==15)
            //   jsonStr+= '{"playerId": "'+this.attributes["for"].value+'","cap": "'+capCheck+'","vcap": "'+VCCheck+'","wk": "'+WKCheck+'","subsPlay": "'+isSubsPlay+'"}';
            // else
              jsonStr+= '{"playerId": "'+this.attributes["for"].value+'","cap": "'+capCheck+'","vcap": "'+VCCheck+'","wk": "'+WKCheck+'","subsPlay": "'+isSubsPlay+'"},';
          }
          
      });

      if(j == 0){
        jsonStr = jsonStr.substring(0, jsonStr.length-1);
        jsonStr+=']}, "teamb": {"teamCode": "'+$('#teamtwo').val()+'","players": [';
      }
      else{
        jsonStr = jsonStr.substring(0, jsonStr.length-1);
        jsonStr+=']}}}';
      }

    }

    document.getElementById('playersDetails').value = jsonStr;
    return true;
}

var selectMatchDetails = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { tournamentCode : val },
      url: '/getMatchesForSelectedTournament',
      success: function(data) {

        var teamSection = '<option value="">--Select--</option>';

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];
            
            teamSection += '<option value="'+val.match_id+'">'+val.match_gen_name+'</option>';

          }
        }
          $('#matchName').html(teamSection);
      
      }
    });
}

var fetchMatchDetails = (val) => {

  console.log("val.. "+val);
    
    $.ajax({
      type: 'GET',
      data: { MatchCode : val },
      url: '/getMatchesDetails',
      success: function(data) {

        var D = document;
        D.getElementById('teamOne').value = data[0]["team_a"];
        D.getElementById('teamtwo').value = data[0]["team_b"];
        D.getElementById('matchType').value = data[0]["match_form_code"];

        $('#matchDate').val(data[0][Object.keys(data[0])[3]]);

        D.getElementById('stadiumName').value = data[0]["stadium_name"];
        D.getElementById('matchCity').value = data[0]["stadium_city"];
        D.getElementById('stadiumCountry').value = data[0]["stadium_country"];
        D.getElementById('umpOne').value = data[0]["umpire_a"];
        D.getElementById('umpTwo').value = data[0]["umpire_b"];
        D.getElementById('referee').value = data[0]["referee_name"];
        D.getElementById('analyst').value = data[0]["analyst_name"];

        var playerListJSON = JSON.parse(data[0]["playing_squad_json"]);
        //var jsonList = playerListJSON["teams"]["teama"]["players"];

        console.log("playerListJSON.. "+JSON.stringify(playerListJSON));

        fetchPlayer('one',data[0]["team_a"], true, playerListJSON);

      }
    });
}

var checkedValidation = (ele) => {

  var attr = ele.value;

  if($('input[subscheck="'+attr+'"]').is(":checked")) {
    alert("A Substitute Cannot be Caption, Vice Caption or WicketKeeper.");
    $(ele).prop("checked", false)
    return;
  }

  if(ele.hasAttribute("vcapradio")){
    attr = ele.getAttribute("vcapradio");
    $('input[capRadio="'+attr+'"]'). prop("checked", false);
    

  }else if(ele.hasAttribute("capRadio")){
    attr = ele.getAttribute("capRadio");
    $('input[vcapradio="'+attr+'"]'). prop("checked", false);

  }else if(ele.hasAttribute("wkradio")){
    attr = ele.getAttribute("wkradio");
    
  }
}

var playerValidation = (ele) => {

  if(ele.classList.contains("playCheck")) {

    let attr = ele.getAttribute("playCheck"), maxPlayerCheck = "";

    if(ele.name == "playingone") {
      maxPlayerCheck = ($('input[name="playingone"]:checked').length > 11) ? "maxReached" : "";
    }else {
      maxPlayerCheck = ($('input[name="playingtwo"]:checked').length > 11) ? "maxReached" : "";
    }

    if(maxPlayerCheck === "maxReached") {
      alert("Playing Can be Maximum of Only 11 Players.");
      ele.checked = false;
    }else {
      $('input[subscheck="'+attr+'"]').prop("checked", false);
    }

   }else {

      let attrVal = ele.getAttribute("subscheck");

      if($('input[vcapradio="'+attrVal+'"]').is(":checked") || $('input[capRadio="'+attrVal+'"]').is(":checked") || $('input[wkradio="'+attrVal+'"]').is(":checked")) {

        alert("Caption, Vice Caption or WicketKeeper Cannot be a Substitute.");
        ele.checked = false;

      }else {
        $('input[playcheck="'+attrVal+'"]').prop("checked", false);
      }

   }

}



