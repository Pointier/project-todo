import styles from "./Day.module.css";
import { useTasks } from "../../context/TasksContext";

import { format, parse } from "date-fns";
interface DayProps {
  day: Date;
}

const Day = ({ day }: DayProps) => {
  // TODO: make a pop up to manage tasks
  const { tasks, updateTasks } = useTasks();
  const numberOfHours: number = 24;
  const hours: number[] = Array(numberOfHours)
    .fill(undefined)
    .map((_, i) => i);

  const dayKey = format(day, "d/M/y");
  const dayTasks = tasks?.byDay.has(dayKey) ? tasks.byDay.get(dayKey) : null;
  console.log("Day Tasks ", dayTasks);
  const minutePerPixel = 0.5;

  const minutesInHour = 60;
  // TODO: handle collision when multiple tasks at the same time
  // TODO: handle if doesnt have hour (place at the top)
  const positionedTasks = dayTasks
    ? dayTasks.map((task) => {
        const hourFormat = "HH:mm:ss";
        const startHour = parse(task.startHour, hourFormat, new Date());
        const endHour = parse(task.endHour, hourFormat, new Date());

        const topPosition =
          (minutesInHour * startHour.getHours() + startHour.getMinutes()) *
          minutePerPixel;
        // Offset to still see the bottom border
        const offset = 3;
        const height =
          (endHour.getHours() * minutesInHour +
            endHour.getMinutes() -
            (startHour.getHours() * minutesInHour + startHour.getMinutes())) *
            minutePerPixel -
          offset;

        console.log("Height ", height);
        return (
          <div
            className={styles.task}
            style={{
              position: "absolute",
              top: `${topPosition}px`,
              height: `${height}px`,
            }}
            key={task.title}
          >
            {task.title}
          </div>
        );
      })
    : null;
  const listHours = hours.map((hour) => <div key={hour}>{hour}</div>);
  const tasksBlock = hours.map((hour) => (
    <div
      className={styles.tasksBlock}
      style={{ height: `${minutePerPixel * minutesInHour}px` }}
      key={hour}
    ></div>
  ));
  return (
    <div>
      <div>Current day : {day.getDate()}</div>
      <div className={styles.container}>
        <div>{listHours}</div>
        <div className={styles.tasksGrid}>
          {tasksBlock}
          {positionedTasks}
        </div>
      </div>
    </div>
  );
};

export default Day;
