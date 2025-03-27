'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Answer.belongsTo(models.Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });
      Answer.belongsTo(models.Question, { foreignKey: 'questionId', onDelete: 'CASCADE' });
    }
  }
  Answer.init({
    userId: DataTypes.UUID,
    gameId: DataTypes.UUID,
    questionId: DataTypes.UUID,
    chosenAnswer: DataTypes.STRING,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};