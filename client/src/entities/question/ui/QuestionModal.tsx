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
  Modal,
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
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (open) {
      setTimeLeft(20);
      setProgress(100);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowNotification(false);
    }
  }, [open]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open && timeLeft > 0 && !isAnswered) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / 20) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(false);
    }
    return () => clearInterval(interval);
  }, [open, timeLeft, isAnswered]);

  const handleAnswer = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    setShowNotification(true);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const handleClose = () => {
    setShowNotification(false);
    onClose();
  };

  const styles = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      bgcolor: 'rgb(1, 4, 81)',
      border: '3px solid rgb(245, 225, 126)',
      borderRadius: '8px',
      boxShadow: 24,
      p: 4,
      color: 'rgb(245, 225, 126)',
    },
    question: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    timerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    progressBar: {
      flex: 1,
      height: '8px',
      backgroundColor: 'rgba(245, 225, 126, 0.2)',
      borderRadius: '4px',
      overflow: 'hidden',
      '& > div': {
        height: '100%',
        backgroundColor: 'rgb(245, 225, 126)',
        transition: 'width 1s linear',
      },
    },
    timer: {
      fontSize: '20px',
      color: 'rgb(245, 225, 126)',
      minWidth: '60px',
      textAlign: 'right',
    },
    answersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginTop: '20px',
    },
    answerButton: {
      backgroundColor: 'rgb(75,107,222)',
      color: 'rgb(245, 225, 126)',
      '&:hover': {
        backgroundColor: 'rgb(245, 225, 126)',
        color: 'rgb(75,107,222)',
      },
      padding: '15px',
      fontSize: '18px',
      height: '80px',
    },
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="question-modal-title"
        aria-describedby="question-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="question-modal-title" variant="h6" component="h2" sx={styles.question}>
            {question.question}
          </Typography>
          <Box sx={styles.timerContainer}>
            <Box sx={styles.progressBar}>
              <Box sx={{ width: `${progress}%` }} />
            </Box>
            <Typography sx={styles.timer}>
              {timeLeft}с
            </Typography>
          </Box>
          <Box sx={styles.answersGrid}>
            <Button
              variant="contained"
              onClick={() => handleAnswer(question.correctAnswer === question.answer1)}
              sx={styles.answerButton}
            >
              {question.answer1}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAnswer(question.correctAnswer === question.answer2)}
              sx={styles.answerButton}
            >
              {question.answer2}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAnswer(question.correctAnswer === question.answer3)}
              sx={styles.answerButton}
            >
              {question.answer3}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAnswer(question.correctAnswer === question.answer4)}
              sx={styles.answerButton}
            >
              {question.answer4}
            </Button>
          </Box>
        </Box>
      </Modal>
      <AnswerNotification
        isCorrect={isCorrect}
        open={showNotification}
        onClose={handleClose}
        message={!isCorrect && timeLeft === 0 ? 'ВЫ НЕ УСПЕЛИ ОТВЕТИТЬ НА ВОПРОС' : undefined}
      />
    </>
  );
}
