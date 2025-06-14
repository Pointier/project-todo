import styles from "./Day.module.css";
import EditTask from "../../manageTasks/EditTask";

import { addHours, format, parse } from "date-fns";
import { useState } from "react";
import { Task } from "../../types/types";
import { useTasks } from "../../context/TasksContext";
import AddTask from "../../manageTasks/AddTask";
import { Mode } from "../Calendar";

interface DayProps {
  day: Date;
  setMode: (mode: Mode) => void;
}

const Day = ({ day, setMode }: DayProps) => {
  const { tasks, updateTasks } = useTasks();
  // TODO: make a pop up to manage tasks
  const [selectedTask, setSelectedTask] = useState<null | Task>(null);
  const [modalHour, setModalHour] = useState<number | null>(null);
  const numberOfHours: number = 24;
  const hours: number[] = Array(numberOfHours)
    .fill(undefined)
    .map((_, i) => i);

  const switchToMonth = (mode: Mode) => {
    setMode(mode);
  };
  const dayKey = format(day, "d/M/y");
  const dayTasks = tasks?.byDay.has(dayKey) ? tasks.byDay.get(dayKey) : null;
  const minutePerPixel = 0.75;
  const offset = 3;
  const minutesInHour = 60;
  // TODO: handle collision when multiple tasks at the same time
  // TODO: handle if doesnt have hour (place at the top)
  const taskUntimed = dayTasks
    ? dayTasks
        .sort((a, b) => a.id - b.id)
        .map((task) => {
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
    return (
      <div key={hour} style={{ top: `${top}px` }} className={styles.hour}>
        {hour}
      </div>
    );
  });
  const taskHour = hours.map((hour) => (
    <div
      className={styles.tasksBlock}
      style={{ height: `${minutePerPixel * minutesInHour}px` }}
      key={hour}
      onClick={() => setModalHour(hour)}
    ></div>
  ));
  let formattedStartHour = "";
  let formattedEndHour = "";
  const defaultTaskDuration = 1;
  if (modalHour) {
    const modalDate = new Date();
    modalDate.setHours(modalHour, 0, 0, 0);
    formattedStartHour = format(modalDate, "HH:mm");

    const endDate = addHours(modalDate, defaultTaskDuration);
    formattedEndHour = format(endDate, "HH:mm");
  }
  return (
    <div className={styles.mainDay}>
      {selectedTask && (
        <div>
          <EditTask
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
          ></EditTask>
        </div>
      )}
      <div className={styles.top}>
        <div className={styles.date} onClick={() => switchToMonth(Mode.Month)}>
          {format(day, "dd MMM yyyy")}
        </div>
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
          {taskHour}
          {positionedTasks}
          {modalHour && (
            <div>
              <AddTask
                onClose={() => setModalHour(null)}
                defaultHasHour={true}
                defaultDate={format(day, "yyyy-MM-dd")}
                defaultStartHour={formattedStartHour}
                defaultEndHour={formattedEndHour}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day;
