import React, { useState } from "react";
import styles from "./Player.module.scss";
import Card from "../card/Card";
import { PlayerSymbol } from "../app/App";

export interface IPlayer {
  name: string;
  symbol: PlayerSymbol;
  setPlayerName: (symbol: PlayerSymbol, name: string) => void;
}

const Player: React.FC<IPlayer> = ({ name, symbol, setPlayerName }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name);

  function toggleEditState() {
    setIsEditing((prevState) => !prevState);
  }

  const handleActionCancel = () => {
    setEditedName(name);
    toggleEditState();
  };

  const handleActionEdit = () => {
    toggleEditState();
  };

  const handleActionSave = () => {
    setPlayerName(symbol, editedName);
    toggleEditState();
  };

  function handlePlayerNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedName(e.target.value);
  }

  return (
    <Card>
      <div className={styles.player}>
        <span className="player__symbol">({symbol})</span>
        {isEditing ? (
          <>
            <input
              className={styles["player--edit"]}
              type="text"
              value={editedName}
              placeholder="ex. John"
              onInput={handlePlayerNameInput}
            ></input>
            <span className={styles["player__actions"]}>
              <button
                className="primary player--action-save"
                onClick={handleActionSave}
              >
                Save
              </button>
              <button
                className="primary player--action-cancel"
                onClick={handleActionCancel}
              >
                Cancel
              </button>
            </span>
          </>
        ) : (
          <>
            <span className={styles["player__name"]}>{name}</span>
            <button
              className="primary player--action-edit"
              onClick={handleActionEdit}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </Card>
  );
};

export default Player;
