 var mysql = require('mysql');
// var pool = mysql.createPool({
//   host    : 'localhost',
//   user    : 'root',
//   password: 'password',
//   database: 'test_database'
// });

var pool = mysql.createPool ({
  host    : 'ec2-35-154-250-73.ap-south-1.compute.amazonaws.com',
  Port	  :  3306,
  user    : 'root',
  password: 'Infotech#321',
  database: 'dev_madhi'
});
 
module.exports = pool;
