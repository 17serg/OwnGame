const path = require('path');
const { Game, User, Question } = require('../../db/models');

class GamesService {
  // Создание новой игры
  async createGame(userId) {
    const game = await Game.create({
      userId,
      score: 0,
      status: 'active',  // Начальный статус игры
    });
    return game;
  }

  // Получение информации о текущей игре
  async getGameStatus(gameId) {
    const game = await Game.findByPk(gameId, {
      include: {
        model: Question,
        as: 'questions',  // Включаем вопросы, связанные с игрой
      }
    });
    return game;
  }

  // Обновление очков в игре
  async updateGameScore(gameId, score) {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Game not found');
    }
    game.score = score;
    await game.save();
    return game;
  }

  // Завершение игры
  async finishGame(gameId) {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error('Game not found');
    }
    game.status = 'completed';
    await game.save();
    return game;
  }

  // Получение всех игр пользователя
  async getUserGames(userId) {
    const games = await Game.findAll({
      where: { userId },
      include: {
        model: Question,
        as: 'questions',  // Включаем вопросы для каждого пользователя
      }
    });
    return games;
  }
}

module.exports = new GamesService();
