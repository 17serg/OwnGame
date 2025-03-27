import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { logoutThunk } from '@/features/authSlice/authSlice';
import UserCard from '@/entities/user/ui/UserCard';

const styles = {
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
  },
};

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = async (): Promise<void> => {
    await dispatch(logoutThunk());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={styles.navLink}>
              {user ? `Добро пожаловать, ${user.name}` : 'Гость'}
            </NavLink>
            <NavLink to={CLIENT_ROUTES.MAIN} style={styles.navLink}>
              Главная
            </NavLink>
            {user && (
              <>
                <NavLink to={CLIENT_ROUTES.BOOKS} style={styles.navLink}>
                  Книги
                </NavLink>
                <NavLink to={CLIENT_ROUTES.ADDBOOK} style={styles.navLink}>
                  Добавить книгу
                </NavLink>
                <NavLink to={CLIENT_ROUTES.GAME} style={styles.navLink}>
                  Игра
                </NavLink>
              </>
            )}
            {!user && (
              <>
                <NavLink to={CLIENT_ROUTES.SIGN_UP} style={styles.navLink}>
                  Регистрация
                </NavLink>
                <NavLink to={CLIENT_ROUTES.LOGIN} style={styles.navLink}>
                  Вход
                </NavLink>
              </>
            )}
          </Typography>
          <UserCard />
          {user && (
            <Button color="inherit" onClick={logoutHandler}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
