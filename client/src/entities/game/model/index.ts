// model/index.ts
import { DataTypes } from 'sequelize';

// Интерфейс для объекта Game
export interface IGame {
  id: number; // INTEGER, уникальный идентификатор игры
  userId: number; // INTEGER, идентификатор пользователя
  score: number; // Текущий счет в игре
  status: "active" | "completed"; // Статус игры (активная или завершенная)
  createdAt: string; // Дата создания игры
  updatedAt: string; // Дата последнего обновления игры
}

// Интерфейс для статуса игры
export interface IGameStatus {
  gameId: number; // INTEGER, идентификатор игры
  status: "active" | "completed"; // Статус игры (активная или завершенная)
  score: number; // Текущий счет
  currentQuestion: number; // Текущий вопрос, на который должен ответить игрок
}

// Интерфейс для вопроса
export interface IQuestion {
  id: number; // INTEGER, уникальный идентификатор вопроса
  category: string; // Категория вопроса (например, "Наука", "История" и т. д.)
  score: number; // Сколько очков дается за правильный ответ
  question: string; // Текст вопроса
  answer1: string; // Первый вариант ответа
  answer2: string; // Второй вариант ответа
  answer3: string; // Третий вариант ответа
  answer4: string; // Четвертый вариант ответа
  correctAnswer: string; // Правильный ответ (например, "answer1", "answer2" и т.д.)
  createdAt: string; // Дата создания вопроса
  updatedAt: string; // Дата последнего обновления вопроса
}

// Интерфейс для ответа на вопрос
export interface IAnswer {
  id: number; // INTEGER, идентификатор ответа
  userId: number; // INTEGER, идентификатор пользователя, который дал ответ
  gameId: number; // INTEGER, идентификатор игры, в которой был дан ответ
  questionId: number; // INTEGER, идентификатор вопроса
  chosenAnswer: string; // Выбранный ответ (например, "answer1")
  correct: boolean; // Ответ правильный или нет
  createdAt: string; // Дата и время, когда был дан ответ
  updatedAt: string; // Дата последнего обновления ответа
}

export interface IUserStats {
  totalGames: number;
  completedGames: number;
  totalScore: number;
  averageScore: string;
}

export interface ILeaderboardEntry {
  userId: number;
  username: string;
  totalScore: number;
}

export interface IGameStatistics {
  userStats: IUserStats;
  leaderboard: ILeaderboardEntry[];
}