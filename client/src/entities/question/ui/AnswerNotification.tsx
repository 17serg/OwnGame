import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type AnswerNotificationProps = {
  isCorrect: boolean;
  open: boolean;
  onClose: () => void;
  message?: string;
};

const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    '& .MuiAlert-root': {
      backgroundColor: 'rgb(1, 4, 81)',
      color: 'rgb(245, 225, 126)',
      fontSize: '24px',
      padding: '20px 40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      minWidth: '330px',
      '& .MuiAlert-message': {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        flex: 1,
      },
    },
  },
};

export default function AnswerNotification({
  isCorrect,
  open,
  onClose,
  message,
}: AnswerNotificationProps): React.JSX.Element {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ 
        '& .MuiSnackbarContent-root': {
          padding: 0,
          minWidth: 'auto',
        }
      }}
    >
      <Alert onClose={onClose} severity={isCorrect ? 'success' : 'error'} sx={styles.notification}>
        {message || (isCorrect ? 'Правильный ответ!' : 'Неправильный ответ!')}
      </Alert>
    </Snackbar>
  );
}
