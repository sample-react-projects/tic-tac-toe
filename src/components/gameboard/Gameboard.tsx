import { useState } from "react";
import styles from "./Gameboard.module.scss";

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

  // Has anyone won

  // has it drawn

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
