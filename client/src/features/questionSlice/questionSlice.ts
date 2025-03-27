import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IQuestion } from '@/entities/question/model';
import { QuestionApi } from '@/entities/question/api/QuestionApi';

interface QuestionState {
  questions: IQuestion[];
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  isLoading: false,
  error: null,
};

export const loadQuestionsThunk = createAsyncThunk('questions/loadQuestions', async () => {
  return QuestionApi.getAllQuestions();
});

export const createQuestionThunk = createAsyncThunk(
  'questions/createQuestion',
  async (question: Omit<IQuestion, 'id' | 'createdAt' | 'updatedAt'>) => {
    return QuestionApi.createQuestion(question);
  },
);

export const updateQuestionThunk = createAsyncThunk(
  'questions/updateQuestion',
  async ({ id, question }: { id: number; question: Partial<IQuestion> }) => {
    return QuestionApi.updateQuestion(id, question);
  },
);

export const deleteQuestionThunk = createAsyncThunk(
  'questions/deleteQuestion',
  async (id: number) => {
    await QuestionApi.deleteQuestion(id);
    return id;
  },
);

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestionsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadQuestionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(loadQuestionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при загрузке вопросов';
      })
      .addCase(createQuestionThunk.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestionThunk.fulfilled, (state, action) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(deleteQuestionThunk.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q) => q.id !== action.payload);
      });
  },
});

export default questionSlice.reducer;
