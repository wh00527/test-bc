module.exports = {
  morgan: {
    format: 'dev'
  },
  db: {
    database: 'test',
    username: 'root',
    password: '',
    connection: {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      operatorsAliases: false
    },
  },
  jwt: {
    validity: 14, // days
    secret: 'secret'
  },
};