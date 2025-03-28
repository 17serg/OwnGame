import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { IQuestion } from '../model';
import QuestionModal from './QuestionModal';
import { useAppSelector } from '@/shared/lib/reduxHooks';
import { IAnswer } from '@/entities/game/model';

interface QuestionCardProps {
  question: IQuestion;
  onCorrectAnswer: (score: number) => void;
}

export default function QuestionCard({
  question,
  onCorrectAnswer,
}: QuestionCardProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { game } = useAppSelector((state) => state.game);

  // Проверяем, был ли дан ответ на этот вопрос
  const isAnswered = game?.answers?.some((answer: IAnswer) => answer.questionId === question.id);

  const handleCardClick = (): void => {
    if (!isAnswered) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleAnswer = (isCorrect: boolean): void => {
    if (isCorrect) {
      onCorrectAnswer(question.score);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 200,
          cursor: isAnswered ? 'default' : 'pointer',
          opacity: isAnswered ? 0.6 : 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: isAnswered ? 'none' : 'scale(1.05)',
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <Typography variant="h3" component="div" color="primary">
              {question.score}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <QuestionModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAnswer={handleAnswer}
        question={question}
      />
    </>
  );
}
