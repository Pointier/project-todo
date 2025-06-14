import { useState } from "react";
import AddTask from "./manageTasks/AddTask";
import TaskItem from "./TaskItem";
import Calendar from "./calendar/Calendar";
import styles from "./MainBody.module.css";
import { format, isSameDay, getHours } from "date-fns";
import { Task } from "./types/types.ts";

interface MainProps {
  day: Date;
}
// TODO: delete the file ?
const Main = ({ day }: MainProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCompletedTask = (completedTaskId: number) => {};

  const tasksByHour = tasks
    .filter((task) => isSameDay(day, task.date))
    .reduce(
      (acc: Record<number, Task[]>, task) => {
        const hour = getHours(task.date);
        if (!acc[hour]) acc[hour] = [] as Task[];
        acc[hour].push(task);
        return acc;
      },
      {} as Record<number, Task[]>,
    );
  return (
    <div className={styles.Main}>
      <h1>Task Manager</h1>
      <button onClick={() => setIsModalOpen(true)}>Add task</button>
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div>
            <AddTask onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h2>Task List</h2>
          <div className={styles.taskContainer}>
            {tasks.map((task) => (
              <div>
                <TaskItem task={task} onComplete={handleCompletedTask} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default Main;
