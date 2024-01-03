import { useState } from "react";
import Card from "../card/Card";
import Gameboard from "../gameboard/Gameboard";
import Players from "../players/Players";
import styles from "./App.module.scss";
import { WINNING_CONDITIONS } from "../../helper/winning-conditions";
import Modal from "../modal/Modal";

export type PlayerSymbol = "X" | "O";
export type BoardSteps = {
  row: number;
  col: number;
  activePlayerSymbol: PlayerSymbol;
};

let board = Array(3)
  .fill(null)
  .map(() => Array<string>(3).fill(""));

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
  let winner: PlayerSymbol | undefined;
  let hasDrawn = false;

  steps.forEach(({ row, col, activePlayerSymbol }) => {
    board[row][col] = activePlayerSymbol;
  });

  const activePlayerSymbol =
    steps.length && steps.at(-1)?.activePlayerSymbol === "X" ? "O" : "X";

  const winnerExists = checkWinnerExists();

  if (winnerExists) {
    winner = activePlayerSymbol === "X" ? "O" : "X";
  }

  if (!winner && steps.length === 9) {
    hasDrawn = true;
  }

  function restartGame() {
    board = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
    setSteps([]);
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
      <Players></Players>
      <Card>
        <Gameboard
          activePlayerSymbol={activePlayerSymbol}
          board={board}
          setSteps={setSteps}
        ></Gameboard>
      </Card>
      {modalContent}
    </div>
  );
};

export default App;
