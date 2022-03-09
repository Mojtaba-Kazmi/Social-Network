"use strict";

var mysql = require('mysql2');

var util = require('util');

function makeDb(config) {
  var connection = mysql.createConnection(config);
  return {
    query: function query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close: function close() {
      return util.promisify(connection.end).call(connection);
    }
  };
}

module.exports = makeDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
//# sourceMappingURL=connexionDatabase2.dev.js.map
