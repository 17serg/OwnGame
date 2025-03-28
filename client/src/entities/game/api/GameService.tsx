import type { AxiosInstance } from 'axios';
import { IGame, IGameStatistics, IGameStatus } from '../model';
import { axiosInstance } from '@/shared/lib/axiosInstance';

class GameService {
  constructor(private readonly client: AxiosInstance) {}

  // Создание новой игры
  async createGame(userId: number): Promise<IGame> {
    const { data } = await this.client.post<IGame>('/game/create', { userId });
    return data;
  }

  // Получение информации о текущей игре
  async getGameStatus(gameId: number): Promise<IGameStatus> {
    const { data } = await this.client.get<IGameStatus>(`/game/${gameId}`);
    return data;
  }

  // Обновление очков в игре
  async updateGameScore(gameId: number, score: number): Promise<IGame> {
    const { data } = await this.client.put<IGame>(`/game/${gameId}/score`, { score });
    return data;
  }

  // Завершение игры
  async finishGame(gameId: number): Promise<IGame> {
    const { data } = await this.client.put<IGame>(`/game/${gameId}/finish`);
    return data;
  }

  // Получение списка всех игр пользователя
  async getUserGames(userId: number): Promise<IGame[]> {
    const { data } = await this.client.get<IGame[]>(`/game/user/${userId}`);
    return data;
  }

  // Получение статистики игрока и таблицы лидеров
  async getGameStatistics(): Promise<IGameStatistics> {
    const { data } = await this.client.get<IGameStatistics>('/game/statistic');
    return data;
  }

  // Получение активной игры пользователя
  async getActiveGame(): Promise<IGame | null> {
    try {
      const { data } = await this.client.get<IGame>('/game/active');
      return data;
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

export default new GameService(axiosInstance);
