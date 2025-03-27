import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; // Путь к store
import { createGame, getGameStatus, updateGameScore, finishGame } from "./slice/"; // Путь к слайсу

const GameComponent = () => {
  const dispatch = useDispatch();
  const { game, gameStatus, loading, error } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    // Пример создания игры с userId = 1
    dispatch(createGame(1));
  }, [dispatch]);

  const handleUpdateScore = (score: number) => {
    if (game) {
      dispatch(updateGameScore({ gameId: game.id, score }));
    }
  };

  const handleFinishGame = () => {
    if (game) {
      dispatch(finishGame(game.id));
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {game && (
        <div>
          <h1>Game ID: {game.id}</h1>
          <p>Status: {game.status}</p>
          <p>Score: {game.score}</p>
          <button onClick={() => handleUpdateScore(game.score + 10)}>Increase Score</button>
          <button onClick={handleFinishGame}>Finish Game</button>
        </div>
      )}
      {gameStatus && <p>Game Status: {gameStatus.status}</p>}
    </div>
  );
};

export default GameComponent;
