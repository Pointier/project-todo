import styles from './TaskItem.module.css'
import { Task } from './AddTask'
import { format } from 'date-fns';

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
        {format(task.date, 'dd MMM y')}
      </div>
      <div>
        <button onClick={() => onComplete(task.id)}>Completed</button>
      </div>
    </div>
  )

}

export default TaskItem
