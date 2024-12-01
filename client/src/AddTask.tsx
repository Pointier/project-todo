import { useState } from "react";
import axios from "axios";
import styles from "./AddTask.module.css";

export interface Task {
  userId: number;
  name: string;
  description: string;
  date: Date;
}

interface AddTaskProps {
  onAddTask: (task: Task) => void;
  onClose: () => void;
}

const AddTask = ({ onAddTask, onClose }: AddTaskProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !description || !date) {
      alert("All fields are required");
      return;
    }
    const taskDate = new Date(date);
    const newTask: Task = {
      userId: 1,
      name: name,
      description: description,
      date: taskDate,
    };
    onAddTask(newTask);
    setName("");
    setDescription("");
    setDate("");
    const formData = new FormData(e.currentTarget);
    const response = await axios.post("http://localhost:3000/tasks", formData);
    console.log(response.data);
  }
  // TODO add validation to the form
  return (
    <div className={styles.AddTask}>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            placeholder="what is the task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" />
        </div>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
