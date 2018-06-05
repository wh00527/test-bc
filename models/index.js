const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const debug = require('debug')('block:models');
const config = require('../config');

const basename = path.basename(module.filename);
const db = {};
const dbConfig = config.db;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password
    , Object.assign({}, {
        define: {
            hooks: {
                beforeSave: (model) => {
                    debug('##############', JSON.stringify(model));
                },
            },
        },
    }, dbConfig.connection)
);


fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).map(file => path.join(__dirname, file)).forEach(filepath => {
    debug('Importing', filepath);
    const model = sequelize.import(filepath);
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
