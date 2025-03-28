'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Game.hasMany(models.Answer, { foreignKey: 'gameId', onDelete: 'CASCADE' });
    }
  }
  Game.init(
    {
      userId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Game',
    },
  );
  return Game;
};
