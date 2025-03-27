import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  ButtonGroup,
  Box,
} from '@mui/material';
import { IQuestion } from '../model';

type QuestionModalProps = {
  question: IQuestion;
  open: boolean;
  onClose: () => void;
};

export default function QuestionModal({
  question,
  open,
  onClose,
}: QuestionModalProps): React.JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" color="primary">
          {question.category} ({question.score} очков)
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" component="div" sx={{ my: 2 }}>
          {question.question}
        </Typography>
        <ButtonGroup orientation="vertical" fullWidth>
          <Button
            variant={question.correctAnswer === 'answer1' ? 'contained' : 'outlined'}
            color={question.correctAnswer === 'answer1' ? 'success' : 'primary'}
          >
            {question.answer1}
          </Button>
          <Button
            variant={question.correctAnswer === 'answer2' ? 'contained' : 'outlined'}
            color={question.correctAnswer === 'answer2' ? 'success' : 'primary'}
          >
            {question.answer2}
          </Button>
          <Button
            variant={question.correctAnswer === 'answer3' ? 'contained' : 'outlined'}
            color={question.correctAnswer === 'answer3' ? 'success' : 'primary'}
          >
            {question.answer3}
          </Button>
          <Button
            variant={question.correctAnswer === 'answer4' ? 'contained' : 'outlined'}
            color={question.correctAnswer === 'answer4' ? 'success' : 'primary'}
          >
            {question.answer4}
          </Button>
        </ButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}
