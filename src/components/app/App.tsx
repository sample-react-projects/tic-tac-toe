import { useState } from "react";
import Gameboard from "../gameboard/Gameboard";
import Players from "../players/Players";
import styles from "./App.module.scss";
import Card from "../util/card/Card";
import Modal from "../util/modal/Modal";
import { BoardSteps } from "../../types/BoardSteps";
import { PlayerSymbol } from "../../types/PlayerSymbol";
import { checkWinnerExists, getEmptyBoard } from "./App.helper";

let board = getEmptyBoard();

const App: React.FC<{}> = () => {
  const [steps, setSteps] = useState<Array<BoardSteps>>([]);
  const [players, setPlayers] = useState<Record<PlayerSymbol, string>>({
    X: "Player 1",
    O: "Player 2",
  });

  let winner: string = "";
  let hasDrawn: boolean = false;
  let activePlayer: PlayerSymbol =
    steps.at(-1)?.activePlayer === "X" ? "X" : "O";

  steps.forEach(({ row, col, activePlayer }) => {
    board[row][col] = activePlayer;
  });

  const winnerExists = checkWinnerExists(board);

  if (winnerExists) {
    winner = players[activePlayer];
  } else if (steps.length === 9) {
    hasDrawn = true;
  }

  activePlayer = activePlayer === "X" ? "O" : "X";

  function restartGame() {
    board = getEmptyBoard();
  }

  function updateSteps(row: number, col: number) {
    setSteps((prevSteps) => [...prevSteps, { row, col, activePlayer }]);
  }

  function updatePlayer(symbol: PlayerSymbol, updatedName: string) {
    setPlayers((prevPlayersState) => {
      prevPlayersState[symbol] = updatedName;
      return { ...prevPlayersState };
    });
  }

  const modalContent =
    hasDrawn || winner ? (
      <Modal
        message={hasDrawn ? `The game is a draw!` : `${winner} won the game`}
        actionLabel="Restart"
        handleActionClick={restartGame}
      ></Modal>
    ) : null;

  return (
    <div className={styles.container}>
      <Players
        activePlayer={activePlayer}
        players={players}
        updatePlayer={updatePlayer}
      ></Players>
      <Card>
        <Gameboard board={board} updateSteps={updateSteps}></Gameboard>
      </Card>
      {modalContent}
    </div>
  );
};

export default App;
