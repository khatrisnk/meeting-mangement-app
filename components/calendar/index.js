import styles from "./calendar.module.css";
import { useClickPreventionOnDoubleClick } from "../../utils/custome-hooks";

const Calendar = ({ calendarData, events, onClick, onDoubleClick }) => {
  const { month, year, weekDays, dates } = calendarData;
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onClick,
    onDoubleClick
  );
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
            <button
              className={`${styles.day} ${isSatorSun && styles.weekend}`}
              onClick={(evt) => handleClick({ evt, date: date.date, month: date.monthNumber })}
              onDoubleClick={(evt) => handleDoubleClick({ evt, date: date.date, month: date.monthNumber })}
              key={date.id}
            >
              <div>{date.date === '01' ? date.dateLable : date.date}</div>
              {events[`${year}-${date.monthNumber}-${date.date}`] && (
                <div className={styles.dot}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
