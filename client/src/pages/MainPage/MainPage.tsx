import React, { useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import logo from '@/assets/1674685141_grizly-club-p-svoya-igra-klipart-1.png';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppSelector } from '@/shared/lib/reduxHooks';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SoundManager from '@/shared/lib/SoundManager';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'rgb(1, 4, 81)',
    position: 'relative' as const,
    textAlign: 'center',
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
  soundButton: {
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    color: 'rgb(245, 225, 126)',
    zIndex: 1000,
  },
};

export function MainPage(): React.JSX.Element {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isMuted, setIsMuted] = React.useState(false);
  const soundManager = SoundManager.getInstance();

  useEffect(() => {
    // Воспроизводим стартовую музыку при загрузке страницы
    soundManager.playMainMusic();

    // Останавливаем музыку при размонтировании компонента
    return () => {
      soundManager.stopBackgroundMusic();
      soundManager.resetMainMusic();
    };
  }, []);

  const handleToggleMute = (): void => {
    soundManager.toggleMute();
    setIsMuted(soundManager.isSoundMuted());
  };

  return (
    <Box sx={styles.container}>
      <IconButton onClick={handleToggleMute} sx={styles.soundButton}>
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      <Box sx={styles.logoContainer}>
        <Box sx={styles.glow} />
        <Box sx={styles.glow2} />
        <Box sx={styles.glow3} />
        <img src={logo} alt="Своя игра" style={styles.logo} />
      </Box>

      {user ? (
        <div>
          <Typography sx={styles.text}>Добро пожаловать, {user.name}!</Typography>
          <Button
            variant="outlined"
            sx={styles.button}
            onClick={() => navigate(CLIENT_ROUTES.GAME)}
          >
            Начать игру
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="outlined"
            sx={styles.button}
            onClick={() => navigate(CLIENT_ROUTES.LOGIN)}
          >
            Войти
          </Button>
          <Typography style={{ opacity: 0.6 }} sx={styles.text}>
            Еще нет аккаунта?
          </Typography>
          <Button
            variant="outlined"
            sx={styles.button}
            onClick={() => navigate(CLIENT_ROUTES.SIGN_UP)}
          >
            Регистрация
          </Button>
        </div>
      )}
    </Box>
  );
}
