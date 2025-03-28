import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IQuestion } from '../model';
import QuestionModal from './QuestionModal';

type QuestionCardProps = {
  question: IQuestion;
};

export default function QuestionCard({ question }: QuestionCardProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const handleCardClick = (): void => {
    if (!isAnswered && !isTimeout) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleAnswer = (): void => {
    setIsAnswered(true);
    setIsModalOpen(false);
  };

  const handleTimeout = (): void => {
    setIsTimeout(true);
    setIsAnswered(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: isAnswered || isTimeout ? 'default' : 'pointer',
          opacity: isAnswered || isTimeout ? 0.7 : 1,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: isAnswered || isTimeout ? 0.7 : 0.8,
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography variant="h2" component="div" color="primary">
            {question.score}
          </Typography>
        </CardContent>
      </Card>
      <QuestionModal
        question={question}
        open={isModalOpen}
        onClose={handleCloseModal}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
      />
    </>
  );
}
