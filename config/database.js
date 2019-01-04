
// var mysql = require('mysql');
// var pool = mysql.createPool({
//         host: 'localhost',
//       user: 'admin',
//       password: 'test',
//       database: 'InterviewTracker'
// });

// module.exports = pool;

var mysql = require('mysql');
 var pool = mysql.createPool({
 	  host: 'interview-tracker.cl126dktpchh.us-east-1.rds.amazonaws.com',
 	  user: 'krishna', 
 	  password: 'krishnakrishna', 
 	  database: 'interview_tracker'
 });

 module.exports = pool;