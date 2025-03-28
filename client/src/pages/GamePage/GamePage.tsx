import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '@/entities/question/ui/QuestionCard';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { loadQuestionsThunk } from '@/features/questionSlice/questionSlice';
import {
  createGame,
  updateGameScore,
  getActiveGame,
  finishGame,
} from '@/entities/game/slice/gameSlice';
import { IQuestion } from '@/entities/question/model';
import { IGame } from '@/entities/game/model';
import { AxiosError } from 'axios';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'rgb(1, 4, 81)',
    padding: '20px',
    paddingTop: '100px',
    maxWidth: '885px',
    margin: '0 auto',
  },
  title: {
    color: 'rgb(245, 225, 126)',
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '30px',
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',
    border: '3px solid rgb(245, 225, 126)',
    borderRadius: '8px',
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 0px 12px 0px',
    borderBottom: '3px solid rgb(245, 225, 126)',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  categoryTitle: {
    color: 'rgb(245, 225, 126)',
    fontSize: '24px',
    fontWeight: 500,
    minWidth: '250px',
    textAlign: 'center',
    paddingRight: '20px',
    margin: '-12px 0',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '-26px',
      bottom: '-26px',
      width: '3px',
      backgroundColor: 'rgb(245, 225, 126)',
    },
  },
  questionsGrid: {
    display: 'flex',
    gap: '0',
    flexWrap: 'wrap',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    margin: '-12px 0',
    '& > *': {
      borderRight: '3px solid rgb(245, 225, 126)',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  scoreContainer: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    backgroundColor: 'rgb(75,107,222)',
    padding: '15px 30px',
    borderRadius: '10px',
    border: '2px solid rgb(245, 225, 126)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  scoreText: {
    color: 'rgb(245, 225, 126)',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: 'rgb(75,107,222)',
    color: 'rgb(245, 225, 126)',
    border: '2px solid rgb(245, 225, 126)',
    '&:hover': {
      backgroundColor: 'rgb(60,90,200)',
    },
  },
};

export function GamePage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);
  const { user } = useAppSelector((state) => state.auth);
  const { game } = useAppSelector((state) => state.game);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  // Инициализируем счетчик значением из текущей игры
  useEffect(() => {
    if (game?.score) {
      setCurrentScore(game.score);
    }
  }, [game?.score]);

  // Проверяем, все ли вопросы отвечены
  const isAllQuestionsAnswered = useMemo(() => {
    if (!game?.answers || !questions.length) return false;
    return questions.every((question: IQuestion) =>
      game.answers?.some((answer: { questionId: number }) => answer.questionId === question.id),
    );
  }, [game?.answers, questions]);

  useEffect(() => {
    dispatch(loadQuestionsThunk());

    if (user) {
      // Сначала проверяем наличие активной игры
      dispatch(getActiveGame())
        .unwrap()
        .then((activeGame: IGame | null) => {
          console.log('Active game found:', activeGame);
          // Создаем новую игру только если нет активной
          if (!activeGame) {
            console.log('No active game found, creating new game...');
            dispatch(createGame(user.id));
          }
        })
        .catch((error: AxiosError) => {
          console.error('Error checking active game:', error);
          // Если ошибка 404 (нет активной игры), создаем новую
          if (error?.response?.status === 404) {
            dispatch(createGame(user.id));
          }
        });
    }
  }, [dispatch, user]);

  // Эффект для автоматического завершения игры при ответе на все вопросы
  useEffect(() => {
    if (isAllQuestionsAnswered && game && game.status === 'active') {
      handleFinishGame();
    }
  }, [isAllQuestionsAnswered, game]);

  const handleCorrectAnswer = (score: number): void => {
    setCurrentScore((prevScore) => prevScore + score);
    if (game) {
      const newScore = (game.score || 0) + score;
      dispatch(updateGameScore({ gameId: game.id, score: newScore }));
    }
  };

  const handleFinishGame = async (): Promise<void> => {
    if (game && game.status === 'active') {
      try {
        await dispatch(finishGame(game.id)).unwrap();
        setShowSuccessAlert(true);
        // Редирект через 2 секунды после успешного завершения
        setTimeout(() => {
          navigate('/statistics');
        }, 2000);
      } catch (error) {
        console.error('Error finishing game:', error);
      }
    }
  };

  // Группируем вопросы по категориям
  const questionsByCategory = questions.reduce(
    (acc: Record<string, IQuestion[]>, question: IQuestion) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    },
    {},
  );

  return (
    <Box sx={styles.container}>
      {/* Счетчик очков и кнопка завершения */}
      <Box sx={styles.scoreContainer}>
        <Typography sx={styles.scoreText}>Счет: {currentScore}</Typography>
        {game?.status === 'active' && (
          <Button variant="contained" onClick={handleFinishGame} sx={styles.finishButton}>
            Завершить игру
          </Button>
        )}
      </Box>

      <Paper elevation={0} sx={styles.paper}>
        {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => (
          <Box key={category} sx={styles.categoryContainer}>
            <Typography sx={styles.categoryTitle}>{category}</Typography>
            <Box sx={styles.questionsGrid}>
              {categoryQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onCorrectAnswer={handleCorrectAnswer}
                  isAnswered={game?.answers?.some((answer) => answer.questionId === question.id)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Paper>
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={2000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Игра успешно завершена!
        </Alert>
      </Snackbar>
    </Box>
  );
}
