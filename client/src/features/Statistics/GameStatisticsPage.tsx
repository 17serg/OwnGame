import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { fetchGameStatistics } from '@/entities/game/slice/gameSlice';
import { ILeaderboardEntry } from '@/entities/game/model';

const GameStatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics, loading, error } = useAppSelector((state) => state.game);

  React.useEffect(() => {
    dispatch(fetchGameStatistics());
  }, [dispatch]);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">Ошибка: {error}</Typography>;
  if (!statistics) return <Typography>Нет данных</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Статистика игр
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Личная статистика */}
        <Paper sx={{ flex: 1, minWidth: '300px', p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Моя статистика
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Всего игр" secondary={statistics.userStats.totalGames} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Завершенных игр"
                secondary={statistics.userStats.completedGames}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Общий счет" secondary={statistics.userStats.totalScore} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Средний счет" secondary={statistics.userStats.averageScore} />
            </ListItem>
          </List>
        </Paper>

        {/* Таблица лидеров */}
        <Paper sx={{ flex: 1, minWidth: '300px', p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Таблица лидеров
          </Typography>
          <List>
            {statistics.leaderboard.map((player: ILeaderboardEntry, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${player.username}`}
                  secondary={`${player.totalScore} очков`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default GameStatisticsPage;
