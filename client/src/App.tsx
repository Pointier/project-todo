import { useState } from 'react'
import './App.css'
import AddTask from './AddTask'
import TaskItem from './Task'

interface Task {
  name: string;
  description: string;
  date: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setIsModalOpen(false)
  }

  return (
    <>
      <h1>Task Manager</h1>
      <button onClick={() => setIsModalOpen(true)}>Add task</button>
      {isModalOpen && <AddTask onAddTask={addTask} onClose={() => setIsModalOpen(false)} />}
      <h2>Task List</h2>
      <ul>{tasks.map((task, index) => (
        <li key={index}><TaskItem task={task} /></li>
      ))}
      </ul>
    </>
  )
}

export default App
