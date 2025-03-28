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

  const styles = {
    card: {
      width: '120px',
      height: '80px',
      backgroundColor: 'rgb(1, 4, 81)',
      color: 'rgb(245, 225, 126)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      '&:hover': {
        backgroundColor: 'rgb(75,107,222)',
      },
    },
    content: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    score: {
      fontSize: '24px',
      fontWeight: 'bold',
        color:'rgb(245, 225, 126)',
      },
    answered: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'not-allowed',
    },
  };

  return (
    <>
      <Card
        sx={styles.card}
        onClick={handleCardClick}
      >
        <CardContent sx={styles.content}>
          <Typography variant="h4" component="div" color="primary" sx={styles.score}>
            {question.score}
          </Typography>
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
