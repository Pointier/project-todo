import { useState } from 'react'

interface Task {
  name: string;
  description: string;
  date: string;
}

interface AddTaskProps {
  onAddTask: (task: Task) => void;
  onClose: () => void;
}

export default function AddTask({ onAddTask, onClose }: AddTaskProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTask: Task = { name: name, description: description, date: date };
    onAddTask(newTask)
    setName('')
    setDescription('')
    setDate('')
  }
  // add validation to the form
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id='name' placeholder='task name' value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label htmlFor="description">Description: </label>
        <input type="text" id='description' placeholder='what is the task' value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <label htmlFor="date">Date: </label>
        <input type="date" id='date' value={date} onChange={(e) => setDate(e.target.value)} /><br />
        <input type="submit" /><br />
        <button onClick={onClose}>Close</button>
      </form>
    </>
  )
}
