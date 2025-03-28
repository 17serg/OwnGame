import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import { fetchGameStatistics } from '@/entities/game/slice/gameSlice';
import { ILeaderboardEntry } from '@/entities/game/model';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';

const GameStatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statistics, loading, error } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (!user) {
      navigate(CLIENT_ROUTES.LOGIN);
      return;
    }
    dispatch(fetchGameStatistics());
  }, [dispatch, user, navigate]);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">Ошибка: {error}</Typography>;
  if (!statistics) return <Typography>Нет данных</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Статистика игр
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Личная статистика */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Моя статистика
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Всего игр
                  </TableCell>
                  <TableCell align="right">{statistics.userStats.totalGames}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Завершенных игр
                  </TableCell>
                  <TableCell align="right">{statistics.userStats.completedGames}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Общий счет
                  </TableCell>
                  <TableCell align="right">{statistics.userStats.totalScore}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Средний счет
                  </TableCell>
                  <TableCell align="right">{statistics.userStats.averageScore}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Лучшая игра
                  </TableCell>
                  <TableCell align="right">{statistics.userStats.bestScore} очков</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Таблица лидеров */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Таблица лидеров
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Место</TableCell>
                  <TableCell>Игрок</TableCell>
                  <TableCell align="right">Счет</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.leaderboard.map((player: ILeaderboardEntry, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.username}</TableCell>
                    <TableCell align="right">{player.totalScore} очков</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default GameStatisticsPage;
