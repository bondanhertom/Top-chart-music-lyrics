'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(models.User,{
        through: models.Favorite,
        foreignKey: "song_id"
      })
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title can not be null"
        },
        notEmpty: {
          msg: "Title Id can not be empty"
        },
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Artist can not be null"
        },
        notEmpty: {
          msg: "Artist Id can not be empty"
        },
      }
    },
    lyrics: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lyrics can not be null"
        },
        notEmpty: {
          msg: "Lyrics can not be empty"
        },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imageUrl can not be null"
        },
        notEmpty: {
          msg: "imageUrl can not be empty"
        },
      }
    },
    releaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};