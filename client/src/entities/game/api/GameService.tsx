import type { AxiosInstance } from "axios";
import { IGame, IGameStatus } from "../model"
import { axiosInstance } from "@/shared/lib/axiosInstance";

class GameService {
  constructor(private readonly client: AxiosInstance) {}

  // Создание новой игры
  async createGame(userId: number): Promise<IGame> {
    const { data } = await this.client.post<IGame>("/games/create", { userId });
    return data;
  }

  // Получение информации о текущей игре
  async getGameStatus(gameId: number): Promise<IGameStatus> {
    const { data } = await this.client.get<IGameStatus>(`/games/${gameId}`);
    return data;
  }

  // Обновление очков в игре
  async updateGameScore(gameId: number, score: number): Promise<IGame> {
    const { data } = await this.client.put<IGame>(`/games/${gameId}/score`, { score });
    return data;
  }

  // Завершение игры
  async finishGame(gameId: number): Promise<IGame> {
    const { data } = await this.client.put<IGame>(`/games/${gameId}/finish`);
    return data;
  }

  // Получение списка всех игр пользователя
  async getUserGames(userId: number): Promise<IGame[]> {
    const { data } = await this.client.get<IGame[]>(`/games/user/${userId}`);
    return data;
  }
}

export default new GameService(axiosInstance);

