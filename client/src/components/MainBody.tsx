import { useState } from "react";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import styles from "./MainBody.module.css";
import { Task } from "./AddTask";
import { format, isSameDay, getHours } from "date-fns";

interface MainProps {
  day: Date;
}

const Main = ({ day }: MainProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsModalOpen(false);
  };

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
            <AddTask
              onAddTask={addTask}
              onClose={() => setIsModalOpen(false)}
            />
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
        <div className={styles.rightContainer}>
          <h2>Selected day:</h2>
          <div>{format(day, "dd MMM y")}</div>
          <div>
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className={styles.hourContainer}>
                <h3>{format(new Date(day.setHours(hour, 0)), "HH:00")}</h3>
                {tasksByHour[hour]?.map((task) => (
                  <div>
                    <TaskItem task={task} onComplete={handleCompletedTask} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
