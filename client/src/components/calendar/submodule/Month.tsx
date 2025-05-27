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
  setDay,
} from "date-fns";
import { enUS, Locale } from "date-fns/locale";
import styles from "./Month.module.css";
import { useTasks } from "../../context/TasksContext";
import { Mode } from "../Calendar";

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
  const { tasks, updateTasks } = useTasks();
  const current = format(currentMonth, "MMMM yyyy");
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
    <div>
      <div>
        <button onClick={setPreviousMonth}>&lt;</button>
        {current}
        <button onClick={setNextMonth}>&gt;</button>
      </div>
      <div className={styles.monthGrid}>
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {dateRange.map((day) => {
          const dayKey = format(day, "d/M/y");
          return (
            <div key={day.toISOString()} className={styles.day}>
              <div
                className={styles.dayNumber}
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
  );
};

export default Month;
