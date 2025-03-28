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

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgb(1, 4, 81)',
  },
  heading: {
    margin: '40px',
    color: 'rgb(245, 225, 126)',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  paper: {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'transparent', 
    border: '3px solid rgb(245, 225, 126)', 
    borderRadius: '8px',
  },
  tableCell: {
    color: 'rgb(245, 225, 126)', 
    fontWeight: 'bold',
  },
  tableCellValue: {
    color: 'rgb(245, 225, 126)', // белый цвет для значений
  },
  leaderboardTable: {
    backgroundColor: 'transparent',
    color: 'rgb(245, 225, 126)', // Устанавливаем желтый цвет для текста в таблице
  },
  tableRow: {
    color: 'rgb(245, 225, 126)', 
    
  },
  tableHeader: {
    color: 'rgb(245, 225, 126)', // Устанавливаем желтый цвет для текста заголовка
  },
  tableHeadCell: {
    fontWeight: 'bold',
    color: 'rgb(245, 225, 126)', // Устанавливаем желтый цвет для текста ячеек заголовка
  },
  tableBodyCell: {
    color: 'rgb(245, 225, 126)', // Устанавливаем желтый цвет для текста ячеек в теле таблицы
  },
};

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
    <Box sx={styles.container}>
      <Typography variant="h3" component="h1" sx={styles.heading}>
        Статистика игр
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Личная статистика */}
        <Paper sx={styles.paper}>
          <Typography variant="h5" gutterBottom sx={{ color: 'rgb(245, 225, 126)' }}>
            Моя статистика
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    Всего игр
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCellValue}>
                    {statistics.userStats.totalGames}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    Завершенных игр
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCellValue}>
                    {statistics.userStats.completedGames}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    Общий счет
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCellValue}>
                    {statistics.userStats.totalScore}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    Средний счет
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCellValue}>
                    {statistics.userStats.averageScore}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={styles.tableCell}>
                    Лучшая игра
                  </TableCell>
                  <TableCell align="right" sx={styles.tableCellValue}>
                    {statistics.userStats.bestScore} очков
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Таблица лидеров */}
        <Paper sx={styles.paper}>
          <Typography variant="h5" gutterBottom sx={{ color: 'rgb(245, 225, 126)' }}>
            Таблица лидеров
          </Typography>
          <TableContainer sx={styles.leaderboardTable}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeader}>
                  <TableCell sx={styles.tableHeadCell}>Место</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Игрок</TableCell>
                  <TableCell align="right" sx={styles.tableHeadCell}>
                    Счет
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.leaderboard.map((player: ILeaderboardEntry, index: number) => (
                  <TableRow key={index} sx={styles.tableRow}>
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
