import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchGameStatistics } from "@/entities/game/slice/gameSlice";
import { IGameStatistics } from "../model";

const GameStatisticsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { statistics, loading, error } = useSelector(
    (state: RootState) => state.game
  );

  useEffect(() => {
    dispatch(fetchGameStatistics());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!statistics) return <p>Нет данных</p>;

  return (
    <div>
      <h1>Статистика игр</h1>

      <h2>Лидерборд</h2>
      <ul>
        {statistics.leaderboard.map((player: { name: string; score: number }, index: number) => (
          <li key={index}>
            {index + 1}. {player.name} — {player.score} очков
          </li>
        ))}
      </ul>

      <h2>Моя статистика</h2>
      <p>Игры сыграно: {statistics.userStats.gamesPlayed}</p>
      <p>Средний счет: {statistics.userStats.averageScore}</p>
    </div>
  );
};

export default GameStatisticsPage;
