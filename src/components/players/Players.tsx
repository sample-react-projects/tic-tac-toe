import { PlayerSymbol } from "../../types/PlayerSymbol";
import Player from "../player/Player";
import Card from "../util/card/Card";
import styles from "./Players.module.scss";

interface IPlayers {
  activePlayer: PlayerSymbol;
  players: Record<PlayerSymbol, string>;
  updatePlayer: (symbol: PlayerSymbol, updatedName: string) => void;
}

const Players: React.FC<IPlayers> = ({
  activePlayer,
  players,
  updatePlayer,
}) => {
  function setPlayerName(symbol: PlayerSymbol) {
    return function (name: string) {
      updatePlayer(symbol, name);
    };
  }

  return (
    <div className={styles.players}>
      {(Object.entries(players) as [PlayerSymbol, string][]).map(
        ([symbol, name]) => (
          <Card key={symbol} active={activePlayer === symbol}>
            <Player name={name} updatePlayer={setPlayerName(symbol)}>
              {symbol}
            </Player>
          </Card>
        )
      )}
    </div>
  );
};

export default Players;
