import styles from "./TaskItem.module.css";
import { Task } from "./types/types";
import { format } from "date-fns";

interface TaskProps {
  task: Task;
  onComplete: (taskId: number) => void;
}
// TODO: delete this file ?
const TaskItem = ({ task, onComplete }: TaskProps) => {
  return (
    <div className={styles.TaskItem}>
      <div>{task.description}</div>
      <div>{format(task.date, "dd MMM y")}</div>
      <div>
        <button onClick={() => onComplete(task.id)}>Completed</button>
      </div>
    </div>
  );
};

export default TaskItem;
