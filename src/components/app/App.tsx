import { useState } from "react";
import Gameboard from "../gameboard/Gameboard";
import Players from "../players/Players";
import styles from "./App.module.scss";
import { WINNING_CONDITIONS } from "../../helper/winning-conditions";
import Card from "../util/card/Card";
import Modal from "../util/modal/Modal";

export type PlayerSymbol = "X" | "O";
export type BoardSteps = {
  row: number;
  col: number;
  activePlayer: PlayerSymbol;
};

function getEmptyBoard() {
  return Array(3)
    .fill(null)
    .map(() => Array<string>(3).fill(""));
}

let board = getEmptyBoard();

function checkWinnerExists() {
  for (let index = 0; index < WINNING_CONDITIONS.length; index++) {
    const condition = WINNING_CONDITIONS[index];
    if (
      board[condition[0].row][condition[0].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[1].row][condition[1].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[2].row][condition[2].col]
    ) {
      return true;
    }
  }

  return false;
}

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

  const winnerExists = checkWinnerExists();

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
