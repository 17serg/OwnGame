import React from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from '@/assets/1674685141_grizly-club-p-svoya-igra-klipart-1.png';
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgb(1, 4, 81)',
    position: 'relative' as const,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: '40px',
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(75,107,222,0.8) 0%, rgba(255,0,0,0) 70%)',
    animation: 'pulse 3s ease-in-out infinite',
    zIndex: 0,
  },
  glow2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(75,107,222,0.6) 0%, rgba(255,255,0,0) 70%)',
    animation: 'pulse 3s ease-in-out infinite 1s',
    zIndex: 0,
  },
  glow3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(75,107,222,0.4) 0%, rgba(0,255,0,0) 70%)',
    animation: 'pulse 3s ease-in-out infinite 2s',
    zIndex: 0,
  },
  logo: {
    maxWidth: '700px',
    width: '100%',
    height: 'auto',
    position: 'relative' as const,
    zIndex: 2,
  },
  button: {
    color: 'rgb(245, 225, 126)',
    border: '2px solid rgb(245, 225, 126)',
    borderRadius: '7px',
    marginBottom: '20px',
    padding: '12px 40px',
    fontSize: '20px',
    position: 'relative' as const,
    zIndex: 2,
    '&:hover': {
      borderColor: 'rgb(245, 225, 126)',
      backgroundColor: 'rgb(75,107,222)',
    },
  },
  text: {
    color: 'rgb(245, 225, 126)',
    marginBottom: '20px',
    fontSize: '20px',
    position: 'relative' as const,
    zIndex: 2,
  },
};

export function MainPage(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.logoContainer}>
        <Box sx={styles.glow} />
        <Box sx={styles.glow2} />
        <Box sx={styles.glow3} />
        <img src={logo} alt="Своя игра" style={styles.logo} />
      </Box>
      <Button 
        variant="outlined" 
        sx={styles.button}
        style={{marginBottom:'3%',border: '3px solid rgb(245, 225, 126)',}}
        onClick={() => navigate(CLIENT_ROUTES.LOGIN)}
      >
        Войти
      </Button>
      <Typography style={{opacity: 0.6,}} sx={styles.text}>Еще нет аккаунта?</Typography>
      <Button 
        variant="outlined" 
        sx={styles.button}
        style={{fontSize: '20px', opacity: 0.6,}}
        onClick={() => navigate(CLIENT_ROUTES.SIGN_UP)}
      >
        Регистрация
      </Button>
    </Box>
  );
}
