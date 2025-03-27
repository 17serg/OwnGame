'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      static associate(models) {
        Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE' });
      }
    
  }
  Question.init({
    category: DataTypes.STRING,
    score: DataTypes.INTEGER,
    question: DataTypes.TEXT,
    answer1: DataTypes.STRING,
    answer2: DataTypes.STRING,
    answer3: DataTypes.STRING,
    answer4: DataTypes.STRING,
    correctAnswer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};