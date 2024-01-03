import styles from "./Gameboard.module.scss";
import { BoardSteps, PlayerSymbol } from "../app/App";

interface IGameboard {
  activePlayer: PlayerSymbol;
  board: string[][];
  setSteps: React.Dispatch<React.SetStateAction<BoardSteps[]>>;
}

const Gameboard: React.FC<IGameboard> = ({ activePlayer, board, setSteps }) => {
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
