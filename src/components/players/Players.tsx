import { PlayerSymbol } from "../app/App";
import Player from "../player/Player";
import styles from "./Players.module.scss";

interface IPlayers {
  players: Record<PlayerSymbol, string>;
  setPlayers: React.Dispatch<
    React.SetStateAction<Record<PlayerSymbol, string>>
  >;
}

const Players: React.FC<IPlayers> = ({ players, setPlayers }) => {
  return (
    <div className={styles.players}>
      {(Object.entries(players) as [PlayerSymbol, string][]).map(
        ([symbol, name]) => (
          <Player
            key={symbol}
            symbol={symbol}
            name={name}
            setPlayers={setPlayers}
          ></Player>
        )
      )}
    </div>
  );
};

export default Players;
