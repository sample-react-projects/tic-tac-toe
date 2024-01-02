import Card from "../card/Card";
import Gameboard from "../gameboard/Gameboard";
import Players from "../players/Players";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Players></Players>
      <Card>
        <Gameboard></Gameboard>
      </Card>
    </div>
  );
}

export default App;
