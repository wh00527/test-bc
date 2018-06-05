/* jshint indent: 1 */
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'users',
    freezeTableName: true,
    createdAt: 'created_date',
    updatedAt: 'updated_date',

    hooks: {
      beforeSave: (user) => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return reject(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
              if (err) {
                return reject(err);
              }
              user.password = hash;
              resolve();
            });
          });
        });
      },
    },
  });
  return User;
};
