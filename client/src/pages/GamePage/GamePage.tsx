import React, { useEffect, useMemo } from 'react';
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

export function GamePage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);
  const { user } = useAppSelector((state) => state.auth);
  const { game } = useAppSelector((state) => state.game);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

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
    <Paper elevation={0}>
      <Box mt={1} py={2} px={2}>
        {/* Отображение текущего счета и кнопки завершения */}
        <Box
          sx={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgb(75,107,222)',
              padding: '15px 30px',
              borderRadius: '10px',
              border: '2px solid rgb(245, 225, 126)',
            }}
          >
            <Typography variant="h4" sx={{ color: 'rgb(245, 225, 126)' }}>
              Счет: {game?.score || 0}
            </Typography>
          </Box>

          {game?.status === 'active' && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinishGame}
              sx={{
                width: '100%',
                py: 1.5,
                backgroundColor: 'rgb(75,107,222)',
                border: '2px solid rgb(245, 225, 126)',
                '&:hover': {
                  backgroundColor: 'rgb(60,90,200)',
                },
              }}
            >
              Закончить игру
            </Button>
          )}
        </Box>

        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Игра успешно завершена! Переход к статистике...
          </Alert>
        </Snackbar>

        {/* Вопросы по категориям */}
        {(Object.entries(questionsByCategory) as [string, IQuestion[]][]).map(
          ([category, categoryQuestions]) => (
            <Box key={category} mb={4} display="flex" alignItems="center" gap={2}>
              <Typography
                variant="h4"
                component="h2"
                color="primary"
                sx={{
                  minWidth: '200px',
                  textAlign: 'right',
                  pr: 2,
                }}
              >
                {category}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                sx={{
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '4px',
                    '&:hover': {
                      background: '#555',
                    },
                  },
                }}
              >
                {categoryQuestions.map((question: IQuestion) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onCorrectAnswer={handleCorrectAnswer}
                  />
                ))}
              </Box>
            </Box>
          ),
        )}
      </Box>
    </Paper>
  );
}
