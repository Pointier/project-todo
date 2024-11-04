import styles from './TaskItem.module.css'
import { Task } from './AddTask'

interface TaskProps {
  task: Task;
  onComplete: (taskId: number) => void;
}
const TaskItem = ({ task, onComplete }: TaskProps) => {
  return (
    <div className={styles.TaskItem}>
      <div>
        {task.name}
      </div>
      <div>
        {task.description}
      </div>
      <div>
        {task.date}
      </div>
      <div>
        <button onClick={() => onComplete(task.id)}>Completed</button>
      </div>
    </div>
  )

}

export default TaskItem
