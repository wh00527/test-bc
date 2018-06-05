# bc api Services

## Author
Kevin Wang

### Development

#### step 1 install node packages

run `npm install`

#### step 2 update required DB credentials

update DB coonection credetaisl from: config/config.development.js, config/config.production.js

#### step 3 DB migration, create DB

update DB connection value from migrations\migrations.js

`const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});`

After then run `node migration.js run create_table_users.js up`

#### step 4 start server

run `npm run dev`

## Test

run `npm run test`

### Production
TODO

# How to use

#### step 1 install node packages

run `npm install`

#### step 2 update required DB credentials

update DB coonection credetaisl from: config/config.development.js, config/config.production.js

#### step 3 DB migration, create DB

update DB connection value from migrations\migrations.js

`const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});`

After then run `node migration.js run create_table_users.js up`

#### step 4 start server

run `npm run dev`

### api detail:
POST /api/user {email:'', password:''} - Creates the user in the database with a non-plain text password.
PUT /api/user/:id {email:''} - Update user's email.
DELETE /api/user/:id - Deletes a user.
GET /api/user/:id - Gets user's email.


