import { useState } from "react";
import styles from "./Gameboard.module.scss";
import { WINNING_CONDITIONS } from "../../helper/winning-conditions";

let board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

type BoardSteps = { row: number; col: number; activePlayer: "X" | "O" };

const Gameboard: React.FC<{}> = () => {
  const [steps, setSteps] = useState<Array<BoardSteps>>([]);

  const activePlayer =
    steps.length && steps.at(-1)?.activePlayer === "X" ? "O" : "X";

  steps.forEach(({ row, col, activePlayer }) => {
    board[row][col] = activePlayer;
  });

  let doesWinnerExist = false;

  WINNING_CONDITIONS.forEach((condition) => {
    if (
      board[condition[0].row][condition[0].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[1].row][condition[1].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[2].row][condition[2].col]
    ) {
      doesWinnerExist = true;
      //break;
    }
  });

  let hasDrawn = false;

  if (!doesWinnerExist && steps.length === 9) {
    hasDrawn = true;
  }
console.log(doesWinnerExist, hasDrawn);
  function resetBoard() {
    board = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
  }

  function handleClick(row: number, col: number) {
    setSteps((prevSteps) => [...prevSteps, { row, col, activePlayer }]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.cells}>
        {board.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={styles.cell}
              disabled={!!symbol}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {symbol ? <span className={styles.symbol}>{symbol}</span> : null}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Gameboard;
