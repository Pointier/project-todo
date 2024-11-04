import { useState } from 'react'
import styles from './AddTask.module.css'

export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
}

interface AddTaskProps {
  onAddTask: (task: Task) => void;
  onClose: () => void;
}

const AddTask = ({ onAddTask, onClose }: AddTaskProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !description || !date) {
      alert('All fields are required')
      return
    }
    const newTask: Task = { id: Date.now(), name: name, description: description, date: date };
    onAddTask(newTask)
    setName('')
    setDescription('')
    setDate('')
  }
  // add validation to the form
  return (
    <div className={styles.AddTask}>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id='name' placeholder='task name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input type="text" id='description' placeholder='what is the task' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input type="date" id='date' value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <input type="submit" />
        </div>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
