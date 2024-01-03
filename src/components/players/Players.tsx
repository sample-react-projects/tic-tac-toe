import { useState } from "react";
import Player from "../player/Player";
import styles from "./Players.module.scss";
import { PlayerSymbol } from "../app/App";

export default function Players() {
  const [players, setPlayers] = useState<Record<PlayerSymbol, string>>({
    X: "Player 1",
    O: "Player 2",
  });

  function updatePlayerName(symbol: PlayerSymbol, name: string) {
    setPlayers((prevPlayersState) => {
      prevPlayersState[symbol] = name;
      return { ...prevPlayersState };
    });
  }

  return (
    <div className={styles.players}>
      {(Object.entries(players) as [PlayerSymbol, string][]).map(
        ([symbol, name]) => (
          <Player
            key={symbol}
            symbol={symbol}
            name={name}
            setPlayerName={updatePlayerName}
          ></Player>
        )
      )}
    </div>
  );
}
