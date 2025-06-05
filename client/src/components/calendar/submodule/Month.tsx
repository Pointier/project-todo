import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subMonths,
  addMonths,
} from "date-fns";
import { enUS, Locale } from "date-fns/locale";
import styles from "./Month.module.css";
import { Mode } from "../Calendar";
import { useTasks } from "../../context/TasksContext";

function getWeekdays(locale: Locale): string[] {
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(2024, 0, i + 1); // Start with January 1st, 2024 (Monday)
    weekdays.push(format(day, "EEE", { locale }));
  }
  return weekdays;
}

interface MonthProps {
  day: Date;
  setDay: (day: Date) => void;
  setMode: (mode: Mode) => void;
}

const Month = ({ day, setDay, setMode }: MonthProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(day);
  const current = format(currentMonth, "MMMM yyyy");
  const { tasks, updateTasks } = useTasks();
  const setNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const setPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const weekDays = getWeekdays(enUS);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const dateRange: Date[] = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const switchToDay = (day: Date, mode: Mode) => {
    setDay(day);
    setMode(mode);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <div className={styles.monthChoice}>
          <button onClick={setPreviousMonth}>&lt;</button>
          <button onClick={setNextMonth}>&gt;</button>

          <span>{current}</span>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.monthGrid}>
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
          {dateRange.map((day) => {
            const dayKey = format(day, "d/M/y");
            const isToday = dayKey === format(new Date(), "d/M/y");
            return (
              <div key={day.toISOString()} className={styles.day}>
                <div
                  className={`${styles.dayNumber} ${isToday ? styles.today : ""}`}
                  onClick={() => {
                    switchToDay(day, Mode.Day);
                  }}
                >
                  {day.getDate()}
                </div>

                {tasks?.byDay.has(dayKey) && "Tasks"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Month;
