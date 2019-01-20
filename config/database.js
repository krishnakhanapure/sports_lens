 var mysql = require('mysql');
// var pool = mysql.createPool({
//   host    : 'localhost',
//   user    : 'root',
//   password: 'password',
//   database: 'test_database'
// });

var pool = mysql.createPool({
  host    : 'id1fu4mq3dmba33.c3nvzhyk44tg.us-east-1.rds.amazonaws.com',
  Port	  :  3306,
  user    : 'ipl',
  password: 'ipl123456',
  database: 'ipl'
});
 
module.exports = pool;
