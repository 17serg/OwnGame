import React, { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
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
                  <QuestionCard key={question.id} question={question} />
                ))}
              </Box>
            </Box>
          ),
        )}
      </Box>
    </Paper>
  );
}
