import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { signupThunk } from '@/features/authSlice/authSlice';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgb(1, 4, 81)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: '-90px',
  },
  form: {
    backgroundColor: 'rgb(75,107,222)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(136, 136, 136, 0.45)',
    width: '400px',
  },
  title: {
    color: 'rgb(245, 225, 126)',
    marginBottom: '30px',
    fontSize: '45px',
    fontWeight: 500,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(245, 225, 126)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(245, 225, 126)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(245, 225, 126)',
      },
      color: 'rgb(245, 225, 126)',
      backgroundColor: 'transparent',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px rgb(75,107,222) inset !important',
        WebkitTextFillColor: 'rgb(245, 225, 126) !important',
        caretColor: 'rgb(245, 225, 126)',
      },
      '&:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px rgb(75,107,222) inset !important',
      },
      '&:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px rgb(75,107,222) inset !important',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgb(245, 225, 126)',
      '&.Mui-focused': {
        color: 'rgb(245, 225, 126)',
      },
    },
  },
  button: {
    color: 'rgb(245, 225, 126)',
    borderColor: 'rgb(245, 225, 126)',
    '&:hover': {
      borderColor: 'rgb(245, 225, 126)',
      backgroundColor: 'rgb(1, 4, 81)',
    },
  },
};

export default function SignUpForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = await dispatch(signupThunk(data));
    if (signupThunk.fulfilled.match(result)) {
      navigate(CLIENT_ROUTES.GAME);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Регистрация</Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onSubmit={submitHandler}
        sx={styles.form}
      >
        {error && <div style={{ color: 'rgb(245, 225, 126)', marginBottom: '10px' }}>{error}</div>}
        <TextField 
          variant="outlined" 
          name="name" 
          label="Имя" 
          disabled={isLoading}
          sx={styles.textField}
          fullWidth
          margin="normal"
        />
        <TextField 
          variant="outlined" 
          name="email" 
          label="Email" 
          type="email" 
          disabled={isLoading}
          sx={styles.textField}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          name="password"
          label="Пароль"
          type="password"
          disabled={isLoading}
          sx={styles.textField}
          fullWidth
          margin="normal"
        />
        <Button 
          variant="outlined" 
          type="submit" 
          disabled={isLoading}
          sx={styles.button}
          fullWidth
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </Box>
    </Box>
  );
}
