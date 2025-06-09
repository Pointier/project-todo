import styles from "./Day.module.css";
import EditTask from "../../manageTasks/EditTask";

import { format, parse } from "date-fns";
import { useState } from "react";
import { Task, Tasks } from "../../types/types";
import { useTasks } from "../../context/TasksContext";
interface DayProps {
  day: Date;
}

const Day = ({ day }: DayProps) => {
  const { tasks, updateTasks } = useTasks();
  // TODO: make a pop up to manage tasks
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const numberOfHours: number = 24;
  const hours: number[] = Array(numberOfHours)
    .fill(undefined)
    .map((_, i) => i);

  const dayKey = format(day, "d/M/y");
  const dayTasks = tasks?.byDay.has(dayKey) ? tasks.byDay.get(dayKey) : null;
  console.log("Day Tasks ", dayTasks);
  const minutePerPixel = 0.75;
  const offset = 3;
  const minutesInHour = 60;
  // TODO: handle collision when multiple tasks at the same time
  // TODO: handle if doesnt have hour (place at the top)
  const taskUntimed = dayTasks
    ? dayTasks.map((task) => {
        if (!task.hasHour) {
          const height = minutePerPixel * minutesInHour - offset;
          return (
            <div
              className={styles.taskUntimed}
              style={{ height: `${height}px` }}
              key={task.id}
              onClick={() => setSelectedTask(task)}
            >
              {task.title}
            </div>
          );
        }
      })
    : null;
  const positionedTasks = dayTasks
    ? dayTasks.map((task) => {
        if (task.hasHour) {
          const hourFormat = "HH:mm:ss";
          const startHour = parse(task.startHour, hourFormat, new Date());
          const endHour = parse(task.endHour, hourFormat, new Date());

          const topPosition =
            (minutesInHour * startHour.getHours() + startHour.getMinutes()) *
            minutePerPixel;
          // Offset to still see the bottom border
          const height =
            (endHour.getHours() * minutesInHour +
              endHour.getMinutes() -
              (startHour.getHours() * minutesInHour + startHour.getMinutes())) *
              minutePerPixel -
            offset;

          return (
            <div
              className={styles.taskTimed}
              style={{
                position: "absolute",
                top: `${topPosition}px`,
                height: `${height}px`,
              }}
              key={task.id}
              onClick={() => setSelectedTask(task)}
            >
              {task.title}
            </div>
          );
        }
      })
    : null;
  // TODO: add section for tasks without hours on top of the day
  const listHours = hours.map((hour) => {
    const top = minutesInHour * minutePerPixel * hour;
    console.log(top);
    return (
      <div key={hour} style={{ top: `${top}px` }} className={styles.hour}>
        {hour}
      </div>
    );
  });
  const tasksBlock = hours.map((hour) => (
    <div
      className={styles.tasksBlock}
      style={{ height: `${minutePerPixel * minutesInHour}px` }}
      key={hour}
    ></div>
  ));
  return (
    <div className={styles.mainDay}>
      {selectedTask && (
        <div className={styles.modalBackdrop}>
          <EditTask
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
          ></EditTask>
        </div>
      )}
      <div className={styles.top}>
        Current day : {day.getDate()}{" "}
        <div
          className={styles.containerTaskUntimed}
          style={{ height: `${minutesInHour * minutePerPixel * 2}px` }} // display 2 tasks
        >
          {taskUntimed}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.hoursBlock}>{listHours}</div>
        <div className={styles.tasksGrid}>
          {tasksBlock}
          {positionedTasks}
        </div>
      </div>
    </div>
  );
};

export default Day;
