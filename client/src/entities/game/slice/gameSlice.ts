import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { IGame, IGameStatistics, IGameStatus } from '../model';
import GameService from '../api/GameService';

// Асинхронные действия для работы с API
export const createGame = createAsyncThunk<IGame, number>(
  'game/createGame',
  async (userId: number) => {
    const game = await GameService.createGame(userId);
    return game;
  },
);

export const getGameStatus = createAsyncThunk<IGameStatus, number>(
  'game/getGameStatus',
  async (gameId: number) => {
    const status = await GameService.getGameStatus(gameId);
    return status;
  },
);

export const updateGameScore = createAsyncThunk<IGame, { gameId: number; score: number }>(
  'game/updateGameScore',
  async ({ gameId, score }) => {
    const updatedGame = await GameService.updateGameScore(gameId, score);
    return updatedGame;
  },
);

export const finishGame = createAsyncThunk<IGame, number>(
  'game/finishGame',
  async (gameId: number) => {
    const finishedGame = await GameService.finishGame(gameId);
    return finishedGame;
  },
);

export const getUserGames = createAsyncThunk<IGame[], number>(
  'game/getUserGames',
  async (userId: number) => {
    const games = await GameService.getUserGames(userId);
    return games;
  },
);

// Добавляем асинхронный экшен для получения статистики
export const fetchGameStatistics = createAsyncThunk<IGameStatistics>(
  'game/fetchGameStatistics',
  async () => {
    return await GameService.getGameStatistics();
  },
);

export const getActiveGame = createAsyncThunk<IGame | null>('game/getActiveGame', async () => {
  return await GameService.getActiveGame();
});

// Определение начального состояния
interface GameState {
  game: IGame | null;
  gameStatus: IGameStatus | null;
  games: IGame[];
  statistics: IGameStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  game: null,
  gameStatus: null,
  games: [],
  statistics: null,
  loading: false,
  error: null,
};

const handleAsyncActions = <T, K extends keyof GameState>(
  builder: ActionReducerMapBuilder<GameState>,
  action: AsyncThunk<T, any, any>, // Убираем unexpected any
  key: K,
): void => {
  // Добавляем return type (void)
  builder
    .addCase(action.pending, (state) => {
      state.loading = true;
    })
    .addCase(action.fulfilled, (state, action: PayloadAction<T>) => {
      state.loading = false;
      state[key] = action.payload as GameState[K]; // Убираем ошибку с never
    })
    .addCase(action.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || `Failed to fetch ${String(key)}`;
    });
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncActions(builder, createGame, 'game');
    handleAsyncActions(builder, getGameStatus, 'gameStatus');
    handleAsyncActions(builder, updateGameScore, 'game');
    handleAsyncActions(builder, finishGame, 'game');
    handleAsyncActions(builder, getUserGames, 'games');
    handleAsyncActions(builder, fetchGameStatistics, 'statistics');
    handleAsyncActions(builder, getActiveGame, 'game');
  },
});

// Создание слайса
// const gameSlice = createSlice({
//   name: "game",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createGame.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createGame.fulfilled, (state, action: PayloadAction<IGame>) => {
//         state.loading = false;
//         state.game = action.payload;
//       })
//       .addCase(createGame.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to create game";
//       })

//       .addCase(getGameStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getGameStatus.fulfilled, (state, action: PayloadAction<IGameStatus>) => {
//         state.loading = false;
//         state.gameStatus = action.payload;
//       })
//       .addCase(getGameStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch game status";
//       })

//       .addCase(updateGameScore.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateGameScore.fulfilled, (state, action: PayloadAction<IGame>) => {
//         state.loading = false;
//         state.game = action.payload;
//       })
//       .addCase(updateGameScore.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to update score";
//       })

//       .addCase(finishGame.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(finishGame.fulfilled, (state, action: PayloadAction<IGame>) => {
//         state.loading = false;
//         state.game = action.payload;
//       })
//       .addCase(finishGame.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to finish game";
//       })

//       .addCase(getUserGames.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserGames.fulfilled, (state, action: PayloadAction<IGame[]>) => {
//         state.loading = false;
//         state.games = action.payload;
//       })
//       .addCase(getUserGames.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch user games";
//       })
//       .addCase(fetchGameStatistics.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchGameStatistics.fulfilled, (state, action: PayloadAction<IGameStatistics>) => {
//         state.loading = false;
//         state.statistics = action.payload;
//       })
//       .addCase(fetchGameStatistics.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch game statistics";
//       });
//   },
// });

export default gameSlice.reducer;
