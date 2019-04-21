var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "prashara",
  database: "empdb"
});

connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {     // Code to test the connection.
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
module.exports = connection;