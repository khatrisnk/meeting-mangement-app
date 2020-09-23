import styles from "./calendar.module.css";

const Calendar = ({ month, year, weekDays, dates }) => {
  return (
    <div className={styles.calendar}>
      <div className={styles.month}>
        {month} {year}
      </div>
      <div className={styles.weekdays}>
        {weekDays.map((day) => {
          return (
            <span className={styles.weekday} key={day}>
              {day}
            </span>
          );
        })}
      </div>
      <div className={styles.gridcontainer}>
        {dates.map((date, index) => {
          const isSatorSun = index % 7 === 0 || index % 7 === 6;
          return (
            <button className={`${styles.day} ${isSatorSun && styles.weekend}`} key={date.id}>
              <div>{date.date}</div>
              <div className={styles.dot}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
