import styles from "./Card.module.scss";

interface ICard {
  children: React.ReactNode;
}
const Card: React.FC<ICard> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
