import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice/authSlice';
import questionReducer from '../features/questionSlice/questionSlice';
import gameReducer from '../entities/game/slice/gameSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    game: gameReducer
  },
});

// Infer the `
