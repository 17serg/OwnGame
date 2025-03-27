import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '@/entities/user/api/UserApi';
import { IUserLoginData, IUserSignUpData, IUser, IAuthResponseData } from '@/entities/user/model';
import { setAccessToken } from '@/shared/lib/axiosInstance';

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginData: IUserLoginData | IAuthResponseData) => {
    if ('email' in loginData) {
      const response = await UserApi.login(loginData);
      setAccessToken(response.data.accessToken);
      return response.data;
    }
    setAccessToken(loginData.accessToken);
    return loginData;
  },
);

export const signupThunk = createAsyncThunk('auth/signup', async (signupData: IUserSignUpData) => {
  const response = await UserApi.signup(signupData);
  setAccessToken(response.data.accessToken);
  return response.data;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await UserApi.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при входе';
      })
      // Signup
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при регистрации';
      })
      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
