fs = require('fs'),
    sql = fs.readFileSync('./create.sql', "utf8");


module.exports = {
    "up": sql,
    "down": "DROP TABLE users"
}