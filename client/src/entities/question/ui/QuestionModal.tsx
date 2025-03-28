import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  ButtonGroup,
  Box,
  LinearProgress,
} from '@mui/material';
import { IQuestion } from '../model';
import AnswerNotification from './AnswerNotification';

type QuestionModalProps = {
  question: IQuestion;
  open: boolean;
  onClose: () => void;
  onAnswer: (isCorrect: boolean) => void;
  onTimeout: () => void;
};

export default function QuestionModal({
  question,
  open,
  onClose,
  onAnswer,
  onTimeout,
}: QuestionModalProps): React.JSX.Element {
  const [isAnswered, setIsAnswered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open && !isAnswered) {
      setTimeLeft(20);
      setProgress(100);

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / 20) * 100);

          if (newTime <= 0) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [open, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowNotification(true);
    setIsCorrect(false);
    onTimeout();
  };

  const handleAnswer = (answerKey: string) => {
    let selectedAnswer: string;

    switch (answerKey) {
      case 'answer1':
        selectedAnswer = question.answer1;
        break;
      case 'answer2':
        selectedAnswer = question.answer2;
        break;
      case 'answer3':
        selectedAnswer = question.answer3;
        break;
      case 'answer4':
        selectedAnswer = question.answer4;
        break;
      default:
        selectedAnswer = '';
    }

    const isAnswerCorrect = selectedAnswer === question.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowNotification(true);
    setIsAnswered(true);
    onAnswer(isAnswerCorrect);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" component="div" color="primary">
              {question.category} ({question.score} очков)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  color={timeLeft <= 5 ? 'error' : 'primary'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {timeLeft}с
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" component="div" sx={{ my: 2 }}>
            {question.question}
          </Typography>
          <ButtonGroup orientation="vertical" fullWidth>
            <Button
              variant={
                isAnswered && question.correctAnswer === question.answer1 ? 'contained' : 'outlined'
              }
              color={
                isAnswered && question.correctAnswer === question.answer1 ? 'success' : 'primary'
              }
              onClick={() => handleAnswer('answer1')}
              disabled={isAnswered}
            >
              {question.answer1}
            </Button>
            <Button
              variant={
                isAnswered && question.correctAnswer === question.answer2 ? 'contained' : 'outlined'
              }
              color={
                isAnswered && question.correctAnswer === question.answer2 ? 'success' : 'primary'
              }
              onClick={() => handleAnswer('answer2')}
              disabled={isAnswered}
            >
              {question.answer2}
            </Button>
            <Button
              variant={
                isAnswered && question.correctAnswer === question.answer3 ? 'contained' : 'outlined'
              }
              color={
                isAnswered && question.correctAnswer === question.answer3 ? 'success' : 'primary'
              }
              onClick={() => handleAnswer('answer3')}
              disabled={isAnswered}
            >
              {question.answer3}
            </Button>
            <Button
              variant={
                isAnswered && question.correctAnswer === question.answer4 ? 'contained' : 'outlined'
              }
              color={
                isAnswered && question.correctAnswer === question.answer4 ? 'success' : 'primary'
              }
              onClick={() => handleAnswer('answer4')}
              disabled={isAnswered}
            >
              {question.answer4}
            </Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
      <AnswerNotification
        isCorrect={isCorrect}
        open={showNotification}
        onClose={handleCloseNotification}
        message={!isCorrect && timeLeft === 0 ? 'ВЫ НЕ УСПЕЛИ ОТВЕТИТЬ НА ВОПРОС' : undefined}
      />
    </>
  );
}
