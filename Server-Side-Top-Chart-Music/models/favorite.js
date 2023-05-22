'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {
        foreignKey: "user_id"
      })
      Favorite.belongsTo(models.Song, {
        foreignKey: "song_id"
      })
    }
  }
  Favorite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User Id can not be null"
        },
        notEmpty: {
          msg: "User Id can not be empty"
        },
      }
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Song Id can not be null"
        },
        notEmpty: {
          msg: "Song Id can not be empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};