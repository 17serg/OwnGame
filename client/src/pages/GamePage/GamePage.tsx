import React, { useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import QuestionCard from '@/entities/question/ui/QuestionCard';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { loadQuestionsThunk } from '@/features/questionSlice/questionSlice';
import { IQuestion } from '@/entities/question/model';

export function GamePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);

  useEffect(() => {
    dispatch(loadQuestionsThunk());
  }, [dispatch]);

  return (
    <Paper elevation={0}>
      <Box mt={1} py={2} px={2} display="flex" flexDirection="row" flexWrap="wrap">
        {questions.map((question: IQuestion) => (
          <Box p={1} key={question.id}>
            <QuestionCard question={question} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
