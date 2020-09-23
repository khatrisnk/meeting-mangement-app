import Link from "next/link";
import styles from "./calendar.module.css";

const Calendar = ({ calendarData, events }) => {
  const { month, year, weekDays, dates } = calendarData;
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
            <Link href={`/schedule-meeting/${date.id}`} key={date.id}>
              <div className={`${styles.day} ${isSatorSun && styles.weekend}`}>
                <div>{date.date}</div>
                {events[date.id] && <div className={styles.dot}></div>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
