import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, subMonths, addMonths } from "date-fns";
import { enUS, Locale } from 'date-fns/locale';
import styles from './Calendar.module.css'

function getWeekdays(locale: Locale): string[] {
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(2024, 0, i + 1); // Start with January 1st, 2024 (Monday)
    weekdays.push(format(day, 'EEE', { locale }));
  }
  return weekdays;
}
// add return type
const Calendar = () => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const current = format(currentMonth, 'MMMM yyyy')
  const setNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const setPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const weekDays = getWeekdays(enUS);

  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 })
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 })

  const dateRange: Date[] = eachDayOfInterval({ start: startDate, end: endDate })
  return (
    <div>
      Calendar:
      <div>
        <button onClick={setPreviousMonth}>&lt;</button>
        {current}
        <button onClick={setNextMonth}>&gt;</button>
      </div>
      <div className={styles.monthGrid}>
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {dateRange.map((day) => (
          <div key={day.toISOString()}>{day.getDate()}</div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
