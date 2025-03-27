import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { loginThunk, clearError } from '@/features/authSlice/authSlice';
import { loadAllBooksThunk, loadFavouriteBooksThunk, loadUserBooksThunk } from '../bookSlice/thunk';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = await dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
      dispatch(loadAllBooksThunk());
      dispatch(loadUserBooksThunk());
      dispatch(loadFavouriteBooksThunk());
      navigate('/');
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      py={5}
      onSubmit={loginHandler}
    >
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <TextField variant="outlined" name="email" label="Email" type="email" disabled={isLoading} />
      <br />
      <TextField
        variant="outlined"
        name="password"
        label="Password"
        type="password"
        disabled={isLoading}
      />
      <br />
      <Button variant="outlined" type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </Box>
  );
}
