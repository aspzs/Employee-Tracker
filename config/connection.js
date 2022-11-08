const mysql = require("mysql2");

const dbConnection = mysql.createConnection(
  {
  host: "localhost",
  user: "root",
  //Enter your personal password and database
  password: "",
  database: ""
},
console.log(`Already Connected`)

);

// NOTE: This program looks to access 'mysql/promise' not just mysql.
module.exports = dbConnection.promise();