import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { signupThunk } from '@/features/authSlice/authSlice';

export default function SignUpForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = await dispatch(signupThunk(data));
    if (signupThunk.fulfilled.match(result)) {
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
      onSubmit={submitHandler}
    >
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <TextField variant="outlined" name="name" label="Имя" disabled={isLoading} />
      <br />
      <TextField variant="outlined" name="email" label="Email" type="email" disabled={isLoading} />
      <br />
      <TextField
        variant="outlined"
        name="password"
        label="Пароль"
        type="password"
        disabled={isLoading}
      />
      <br />
      <Button variant="outlined" type="submit" disabled={isLoading}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </Box>
  );
}
