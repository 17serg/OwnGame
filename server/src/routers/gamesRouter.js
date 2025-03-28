const gamesRouter = require('express').Router();
const checkId = require('../middlewares/checkId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const { Game, Question, User } = require('../../db/models'); 

// Получение всех вопросов
gamesRouter.get('/questions', verifyAccessToken, async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.log('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

// Создание новой игры
gamesRouter.post('/create', verifyAccessToken, async (req, res) => {
  try {
    const { userId } = res.locals.user; // Извлекаем userId из res.locals.user, который добавляется после верификации токена

    const game = await Game.create({
      userId,
      score: 0, // Начальный счёт
      status: 'active', // Статус игры - активная
    });

    res.status(201).json(game); // Отправляем созданную игру
  } catch (error) {
    console.log('Error creating game:', error);
    res.status(500).json({ message: 'Failed to create game' });
  }
});

// Получение вопроса по ID
gamesRouter.get('/question/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question); // Отправляем найденный вопрос
  } catch (error) {
    console.log('Error fetching question:', error);
    res.status(500).json({ message: 'Failed to fetch question' });
  }
});

gamesRouter.post('/answer', verifyAccessToken, async (req, res) => {
  const { gameId, questionId, chosenAnswer } = req.body;

  try {
    // Проверка, существует ли игра
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Проверка, существует ли вопрос
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Создаем запись о ответе
    const answer = await Answer.create({
      userId: res.locals.user.id, // Извлекаем userId из токена
      gameId,
      questionId,
      chosenAnswer,
      correct: chosenAnswer === question.correctAnswer, // Проверяем правильность ответа
    });

    // Если ответ правильный, обновляем счёт
    if (answer.correct) {
      game.score += question.score; // Добавляем очки за правильный ответ
      await game.save();
    }

    res.json(answer); // Отправляем записанный ответ
  } catch (error) {
    console.log('Error submitting answer:', error);
    res.status(500).json({ message: 'Failed to submit answer' });
  }
});

// Получение информации о текущей игре пользователя
gamesRouter.get('/', verifyAccessToken, async (req, res) => {
  const { userId } = res.locals.user; // Извлекаем userId из токена

  try {
    // Ищем активную игру пользователя
    const game = await Game.findOne({
      where: {
        userId,
        status: 'active', // Ищем только активные игры
      },
      include: {
        model: Question, // Включаем вопросы в игру
        as: 'questions',
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'No active game found' });
    }

    // Собираем список тем из вопросов
    const topics = game.questions.map((question) => question.topic);

    // Возвращаем информацию о текущей игре: тема, счёт, количество очков
    res.json({
      topics,
      score: game.score,
      totalScore: game.questions.reduce((total, question) => total + question.score, 0), // Суммарное количество очков
    });
  } catch (error) {
    console.log('Error fetching game data:', error);
    res.status(500).json({ message: 'Failed to fetch game data' });
  }
});

// Получение информации о текущей игре пользователя
gamesRouter.get('/', verifyAccessToken, async (req, res) => {
  const { userId } = res.locals.user; // Извлекаем userId из токена

  try {
    // Ищем активную игру пользователя
    const game = await Game.findOne({
      where: {
        userId,
        status: 'active', // Ищем только активные игры
      },
      include: {
        model: Question, // Включаем вопросы в игру
        as: 'questions',
        attributes: ['category', 'score'], // Берём только нужные поля
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'No active game found' });
    }

    // Собираем список категорий из вопросов
    const categories = game.questions.map((question) => question.category);

    // Возвращаем информацию о текущей игре: категории, счёт, количество очков
    res.json({
      categories, // Список категорий из вопросов
      score: game.score, // Текущий счёт игры
      totalScore: game.questions.reduce((total, question) => total + question.score, 0), // Суммарное количество очков
    });
  } catch (error) {
    console.log('Error fetching game data:', error);
    res.status(500).json({ message: 'Failed to fetch game data' });
  }
});



// Получение статистики текущего игрока и таблицы лидеров
gamesRouter.get('/statistics', verifyAccessToken, async (req, res) => {
  const { userId } = res.locals.user; // Получаем ID пользователя из токена

  try {
    // 1. Статистика текущего игрока
    const userGames = await Game.findAll({ where: { userId } });

    if (!userGames.length) {
      return res.status(404).json({ message: 'У пользователя нет игр' });
    }

    const totalGames = userGames.length;
    const completedGames = userGames.filter(game => game.status === 'completed').length;
    const totalScore = userGames.reduce((sum, game) => sum + game.score, 0);
    const averageScore = totalGames > 0 ? (totalScore / totalGames).toFixed(2) : 0;

    const userStats = {
      totalGames,       // Всего игр
      completedGames,   // Завершённых игр
      totalScore,       // Общий счёт
      averageScore,     // Средний счёт
    };

    // 2. Таблица лидеров (ТОП-10 игроков по сумме очков)
    const leaderboard = await Game.findAll({
      attributes: ['userId', [Game.sequelize.fn('SUM', Game.sequelize.col('score')), 'totalScore']],
      group: ['userId'],
      include: [{ model: User, attributes: ['id', 'username'] }], // Присоединяем пользователей
      order: [[Game.sequelize.fn('SUM', Game.sequelize.col('score')), 'DESC']], // Сортировка по очкам
      limit: 10,
    });

    const topPlayers = leaderboard.map(({ user, dataValues }) => ({
      userId: user.id,
      username: user.username,
      totalScore: dataValues.totalScore,
    }));

    // Отправляем ответ
    res.json({
      userStats,
      leaderboard: topPlayers,
    });
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
    res.status(500).json({ message: 'Ошибка при получении статистики' });
  }
});

module.exports = gamesRouter;


module.exports = gamesRouter; 
