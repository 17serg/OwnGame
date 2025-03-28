import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { logoutThunk } from '@/features/authSlice/authSlice';

const styles = {
  navLink: {
    color: 'rgb(245, 225, 126)',
    textDecoration: 'none',
    marginRight: '20px',
    whiteSpace: 'nowrap',
    border: '2px solid rgb(245, 225, 126)',
    borderRadius: '7px',
    padding: '4px 12px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'rgb(75,107,222)',
    },
  },
  button: {
    color: 'rgb(245, 225, 126)',
    border: '2px solid rgb(245, 225, 126)',
    borderRadius: '7px',
    padding: '4px 12px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'rgb(75,107,222)',
    },
  },
  buttonLink: {
    color: 'rgb(245, 225, 126)',
    textDecoration: 'none',
    marginRight: '20px',
    border: '2px solid rgb(245, 225, 126)',
    borderRadius: '7px',
    padding: '4px 12px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'rgb(75,107,222)',
    },
  },
};

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = async (): Promise<void> => {
    await dispatch(logoutThunk());
  };

  return (
    <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginTop: 0, marginBottom:'5%' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgb(1, 4, 81)', height: '84px', top: 0 }}>
        <Toolbar sx={{ height: '100%' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '2%', fontSize: '24px', whiteSpace: 'nowrap' }}>
            <Box 
              component={user ? NavLink : 'div'} 
              to={user ? CLIENT_ROUTES.GAME : CLIENT_ROUTES.LOGIN} 
              sx={{
                ...styles.navLink,
                opacity: user ? 1 : 1,
                cursor: user ? 'pointer' : 'not-allowed',
                pointerEvents: user ? 'auto' : 'none',
              }}
            >
              Своя игра
            </Box>
            <Box component={NavLink} to="/" sx={{...styles.navLink, marginLeft: '66%', marginRight:'4%'}}>
              {user ? `Добро пожаловать, ${user.name}` : 'Гость'}
            </Box>
            {!user && (
              <>
                <Box component={NavLink} to={CLIENT_ROUTES.SIGN_UP} sx={styles.buttonLink}>
                  Регистрация
                </Box>
                <Box component={NavLink} to={CLIENT_ROUTES.LOGIN} sx={styles.buttonLink}>
                  Вход
                </Box>
              </>
            )}
            {user && (
              <Box
                component="button"
                onClick={logoutHandler}
                sx={{
                  ...styles.buttonLink,
                  background: 'none',
                  border: '2px solid rgb(245, 225, 126)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  padding: '9px 12px',
                }}
              >
                Выйти
              </Box>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        width: '100%', 
        height: '4px', 
        backgroundColor: 'rgb(245, 225, 126)',
        position: 'fixed',
        top: '84px',
        zIndex: 1100
      }} />
    </Box>
  );
}
