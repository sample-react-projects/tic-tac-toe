import styles from "./Card.module.scss";

interface ICard {
  active?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<ICard> = ({ active, children }) => {
  return (
    <div className={`${styles.card} ${active ? styles.active : null}`}>
      {children}
    </div>
  );
};

export default Card;
