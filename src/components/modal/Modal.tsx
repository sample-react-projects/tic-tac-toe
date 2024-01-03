import styles from "./Modal.module.scss";

interface IModal {
  message: string;
  actionLabel: string;
  handleActionClick: () => void;
}

const Modal: React.FC<IModal> = ({
  actionLabel,
  handleActionClick,
  message,
}) => {
  return (
    <div className={styles.modal__mask}>
      <div className={styles.modal__content}>
        <div className={styles.modal__text}>{message}</div>
        <button className="primary" onClick={handleActionClick}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default Modal;
