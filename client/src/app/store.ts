import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/bookSlice/slice';
import authReducer from '../features/authSlice/authSlice';
import questionReducer from '../features/questionSlice/questionSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    questions: questionReducer,
  },
});

// Infer the `
