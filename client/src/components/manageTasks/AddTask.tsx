import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import styles from "./AddTask.module.css";

interface AddTaskProps {
  onClose: () => void;
}

interface TaskData {
  name: string;
  description: string;
  date: Date;
  startHour: string;
  endHour: string;
  hasHour: boolean;
  isRecurring: boolean;
}

const AddTask = ({ onClose }: AddTaskProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [hasHour, setHasHour] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const { user, loading } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !description || !date) {
      alert("All fields are required");
      return;
    }
    const taskDate = new Date(date);
    const newTask: TaskData = {
      name: name,
      description: description,
      date: taskDate,
      hasHour: hasHour,
      startHour: startHour,
      endHour: endHour,
      isRecurring: isRecurring,
    };
    setName("");
    setDescription("");
    setDate("");
    setHasHour(false);
    setStartHour("");
    setEndHour("");
    setIsRecurring(false);
    if (user) {
      const refresh = true;
      const token = await user.getIdToken(refresh);
      console.log(newTask);
      const response = await axios.post(
        "http://localhost:3000/tasks/add",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log(response.data);
      onClose();
    } else {
      console.error("No user logged in, cannot add task");
    }
  }
  // TODO: add validation to the form
  return (
    <div className={styles.AddTask}>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
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
            name="description"
            placeholder="what is the task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          {/* TODO: add custom or stylized calendar*/}
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hasHour">Has Hour:</label>
          <input
            type="checkbox"
            id="hasHour"
            name="hasHour"
            checked={hasHour}
            onChange={(e) => setHasHour(e.target.checked)}
          />
        </div>
        {hasHour && (
          <div>
            <div>
              <label htmlFor="startHour">Start Hour: </label>
              <input
                type="time"
                id="startHour"
                name="startHour"
                onChange={(e) => setStartHour(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="endHour">End Hour:</label>
              <input
                type="time"
                id="endHour"
                name="endHour"
                onChange={(e) => setEndHour(e.target.value)}
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="recurring">Recurring Task :</label>
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
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
