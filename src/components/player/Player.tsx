import React, { useState } from "react";
import styles from "./Player.module.scss";

export interface IPlayer {
  children: React.ReactNode;
  name: string;
  updatePlayer: (updatedName: string) => void;
}

const Player: React.FC<IPlayer> = ({ children, name, updatePlayer }) => {
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
    updatePlayer(editedName);
    toggleEditState();
  };

  function handlePlayerNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedName(e.target.value);
  }

  return (
    <div className={styles.player}>
      <span className="player__symbol">({children})</span>
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
            <button className={styles.primary} onClick={handleActionSave}>
              Save
            </button>
            <button className={styles.primary} onClick={handleActionCancel}>
              Cancel
            </button>
          </span>
        </>
      ) : (
        <>
          <span className={styles["player__name"]}>{name}</span>
          <button className={styles.primary} onClick={handleActionEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Player;
