import { UserApi } from '@/entities/user/api/UserApi';
import { setAccessToken } from '@/shared/lib/axiosInstance';
import Footer from '@/widgets/Footer.tsx/Footer';
import NavBar from '@/widgets/NavBar/NavBar';
import { Container, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loginThunk } from '@/features/authSlice/authSlice';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';

export default function Layout(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isMainPage = location.pathname === CLIENT_ROUTES.MAIN;

  useEffect(() => {
    UserApi.refreshTokens().then((response) => {
      if (response.status === 200) {
        dispatch(loginThunk(response.data));
        setAccessToken(response.data.accessToken);
      }
    });
  }, [dispatch]);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'rgb(1, 4, 81)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <Container>
        {!isMainPage && <NavBar />}
        <Outlet />
        {!isMainPage && <Footer />}
      </Container>
    </Box>
  );
}
