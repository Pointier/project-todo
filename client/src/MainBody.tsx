import { useState } from 'react'
import AddTask from './AddTask'
import TaskItem from './TaskItem'
import styles from './MainBody.module.css'
import { Task } from './AddTask'
import { format, isSameDay } from 'date-fns'

interface MainProps {
  day: Date
}

const Main = ({ day }: MainProps) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setIsModalOpen(false)
  }

  const handleCompletedTask = (completedTaskId: number) => {
    setTasks(tasks.filter(task => task.id != completedTaskId))
  }
  return (
    <div className={styles.Main}>
      <h1>Task Manager</h1>
      <button onClick={() => setIsModalOpen(true)}>Add task</button>
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div>
            <AddTask onAddTask={addTask} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h2>Task List</h2>
          <div className={styles.taskContainer}>
            {tasks.map((task) => (
              <div key={task.id}><TaskItem task={task} onComplete={handleCompletedTask} /></div>
            ))}
          </div>
        </div>
        <div className={styles.rightContainer}><h2>Selected day:</h2>
          <div>{format(day, 'dd MMM y')}</div>
          <div>
            {tasks.filter(task => isSameDay(day, task.date)).map((task) => (
              <div key={task.id}>
                <TaskItem task={task} onComplete={handleCompletedTask} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Main
