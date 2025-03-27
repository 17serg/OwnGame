import React, { CSSProperties, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IQuestion } from '../model';
import QuestionModal from './QuestionModal';

const cardStyle: CSSProperties = {
  minWidth: 263,
  maxWidth: 355,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

type QuestionCardProps = {
  question: IQuestion;
};

export default function QuestionCard({ question }: QuestionCardProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          ...cardStyle,
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography variant="h2" component="div" color="primary">
            {question.score}
          </Typography>
          <Typography variant="h6" component="div" color="text.secondary">
            очков
          </Typography>
        </CardContent>
      </Card>
      <QuestionModal question={question} open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
