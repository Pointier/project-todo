import { useState } from 'react'
import AddTask from './AddTask'
import TaskItem from './TaskItem'
import styles from './MainBody.module.css'
import { Task } from './AddTask'

const Main = () => {

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
      <h2>Task List</h2>
      <div className={styles.taskContainer}>
        {tasks.map((task) => (
          <div key={task.id}><TaskItem task={task} onComplete={handleCompletedTask} /></div>
        ))}
      </div>
    </div>
  )
}

export default Main
