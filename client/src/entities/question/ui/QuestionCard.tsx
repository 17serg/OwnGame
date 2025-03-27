import React, { CSSProperties } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IQuestion } from '../model';

const cardStyle: CSSProperties = {
  minWidth: 263,
  maxWidth: 355,
  minHeight: 280,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

type QuestionCardProps = {
  question: IQuestion;
};

export default function QuestionCard({ question }: QuestionCardProps): React.JSX.Element {
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {question.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {question.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ответ: {question.answer}
        </Typography>
      </CardContent>
    </Card>
  );
}
