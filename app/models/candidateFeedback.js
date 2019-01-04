var queryConstant = require('../../config/queries.js');
var tableName = "candidateFeedback";

var candidateFeedbackSchema = {
   candidateName :'candidateName',
   r1feedback :'r1feedback',
   r2feedback:'r2feedback',
   r3feedback:'r3feedback',
   r1communication: 'r1communication',
   r2communication: 'r2communication',
   r3communication: 'r3communication',
   r1learn:'r1learn',
   r2learn:'r2learn',
   r3learn:'r3learn',
   r1accomplishments:'r1accomplishments',
   r2accomplishments:'r2accomplishments',
   r3accomplishments:'r3accomplishments',
   r1attitude:'r1attitude',
   r2attitude:'r2attitude',
   r13attitude:'r3attitude',
   r1hire:'r1hire',
   r2hire:'r2hire',
   r3hire:'r3hire',
   round:'round'
}



var extractObject = [], createdBy = 'Prabhas';

buildQuery = (o) => {
  console.log("its me");
  console.log(o);
     var extractObject =[];

if(o.round == 0){
     extractObject.push(o.candidateName,o.r1feedback,o.r1communication,o.r1learn, o.r1accomplishments,o.r1attitude,o.r1hire);
     return queryConstant.INSERT_CANDIDATE_FEEDBACK(extractObject, createdBy);
}
else if(o.round == 1){
     extractObject.push(o.r2feedback,o.r2communication,o.r2learn, o.r2accomplishments,o.r2attitude,o.r2hire);
     return queryConstant.UPDATE_CANDIDATE_FEEDBACK_2(extractObject, createdBy ,o.candidateName);
}

else if(o.round == 2){
     extractObject.push(o.r3feedback,o.r3communication,o.r3learn, o.r3accomplishments,o.r3attitude,o.r3hire);
     return queryConstant.UPDATE_CANDIDATE_FEEDBACK_3(extractObject, createdBy ,o.candidateName);
}
     
}

buildSelectQuery = () => {
  return queryConstant.SELECT_ANYTHING(tableName);
}


addRounds = (o,c) =>{
  for(var i =0; i< o.length;i++){
       o[i].round = 0;

       for(var j =0;j< c.length;j++){
             if(o[i].candidateName == c[j].candidateName){

                  if(c[j].r1hire){
                      o[i].round =1;
                  }

                  if(c[j].r2hire){
                        o[i].round =2;
                  }
                   if(c[j].r3hire){
                        o[i].round =3;
                  }

                  if(c[j].r1hire == "no" ||c[j].r2hire == "no"|| c[j].r3hire == "no" ){
                     o[i].rejected = 1;
                  }
                 
             }
       }
    }

  return o;
}

module.exports = { buildQuery: buildQuery , addRounds: addRounds, buildSelectQuery:buildSelectQuery };