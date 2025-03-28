import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type AnswerNotificationProps = {
  isCorrect: boolean;
  open: boolean;
  onClose: () => void;
  message?: string;
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
    >
      <Alert onClose={onClose} severity={isCorrect ? 'success' : 'error'} sx={{ width: '100%' }}>
        {message || (isCorrect ? 'Правильный ответ!' : 'Неправильный ответ!')}
      </Alert>
    </Snackbar>
  );
}
