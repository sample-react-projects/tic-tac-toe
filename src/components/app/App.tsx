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
  const [players, setPlayers] = useState<Record<PlayerSymbol, string>>({
    X: "Player 1",
    O: "Player 2",
  });

  let winner: string = "";
  let hasDrawn: boolean = false;

  steps.forEach(({ row, col, activePlayer }) => {
    board[row][col] = activePlayer;
  });

  const activePlayer =
    steps.length && steps.at(-1)?.activePlayer === "X" ? "O" : "X";

  const winnerExists = checkWinnerExists();

  if (winnerExists) {
    winner = activePlayer === "X" ? players["O"] : players["X"];
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
      <Players
        activePlayer={activePlayer}
        players={players}
        setPlayers={setPlayers}
      ></Players>
      <Card>
        <Gameboard
          activePlayer={activePlayer}
          board={board}
          setSteps={setSteps}
        ></Gameboard>
      </Card>
      {modalContent}
    </div>
  );
};

export default App;
