import { PlayerSymbol } from "../app/App";
import Player from "../player/Player";
import Card from "../util/card/Card";
import styles from "./Players.module.scss";

interface IPlayers {
  activePlayer: PlayerSymbol;
  players: Record<PlayerSymbol, string>;
  setPlayers: React.Dispatch<
    React.SetStateAction<Record<PlayerSymbol, string>>
  >;
}

const Players: React.FC<IPlayers> = ({ activePlayer, players, setPlayers }) => {
  return (
    <div className={styles.players}>
      {(Object.entries(players) as [PlayerSymbol, string][]).map(
        ([symbol, name]) => (
          <Card active={activePlayer === symbol}>
            <Player
              key={symbol}
              symbol={symbol}
              name={name}
              setPlayers={setPlayers}
            ></Player>
          </Card>
        )
      )}
    </div>
  );
};

export default Players;
