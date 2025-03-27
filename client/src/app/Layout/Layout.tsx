import { UserApi } from '@/entities/user/api/UserApi';
import { setAccessToken } from '@/shared/lib/axiosInstance';
import Footer from '@/widgets/Footer.tsx/Footer';
import NavBar from '@/widgets/NavBar/NavBar';
import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/reduxHooks';
import { loginThunk } from '@/features/authSlice/authSlice';

export default function Layout(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    UserApi.refreshTokens().then((response) => {
      if (response.status === 200) {
        dispatch(loginThunk(response.data));
        setAccessToken(response.data.accessToken);
      }
    });
  }, [dispatch]);
  return (
    <>
      <Container>
        <NavBar />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}
