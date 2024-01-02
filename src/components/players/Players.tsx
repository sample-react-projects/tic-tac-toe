import { useState } from "react";
import Player from "../player/Player";
import styles from "./Players.module.scss";

export default function Players() {
  const [players, setPlayers] = useState<Record<string, string>>({
    X: "Player 1",
    O: "Player 2",
  });

  function updatePlayerName(symbol: string, name: string) {
    setPlayers((prevPlayersState) => {
      prevPlayersState[symbol] = name;
      return { ...prevPlayersState };
    });
  }

  return (
   
      <div className={styles.players}>
        {Object.entries(players).map(([symbol, name]) => (
          <Player
            symbol={symbol}
            name={name}
            setPlayerName={updatePlayerName}
          ></Player>
        ))}
      </div>
    
  );
}
