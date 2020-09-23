import styles from "./modal.module.css";
const Modal = (props) => {
  const {
    closeModal,
    eventData: { date, name, description, attendees },
  } = props;
  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>X</button>
        <div className={styles.modalrow}>
          <label>Date: </label>
          <span>{date}</span>
        </div>
        <div className={styles.modalrow}>
          <label>Name: </label>
          <span>{name}</span>
        </div>
        <div className={styles.modalrow}>
          <label>Description: </label>
          <span>{description}</span>
        </div>
        <div className={styles.modalrow}>
          <label>Attendees: </label>
          <span>{attendees}</span>
        </div>
      </div>
    </>
  );
};

export default Modal;
