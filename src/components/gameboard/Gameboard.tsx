import styles from "./Gameboard.module.scss";

interface IGameboard {
  board: string[][];
  updateSteps: (row: number, col: number) => void;
}

const Gameboard: React.FC<IGameboard> = ({ board, updateSteps }) => {
  return (
    <div className={styles.gameboard}>
      <div className={styles.gameboard__cells}>
        {board.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={styles.gameboard__cell}
              disabled={!!symbol}
              onClick={() => updateSteps(rowIndex, colIndex)}
            >
              {symbol ? (
                <span className={styles.gameboard__symbol}>{symbol}</span>
              ) : null}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Gameboard;
