const mysql = require('mysql'),
      path = require('path')
      migration = require('mysql-migrations');

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

migration.init(connection, __dirname + '/');