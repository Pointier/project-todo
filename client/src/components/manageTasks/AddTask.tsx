import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import axios from "axios";
import styles from "./AddTask.module.css";

interface AddTaskProps {
  onClose: () => void;
  defaultHasHour?: boolean;
  defaultStartHour?: string;
  defaultEndHour?: string;
  defaultDate?: string;
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

const API_URL = import.meta.env.VITE_API_URL;

const AddTask = ({
  onClose,
  defaultHasHour = false,
  defaultDate = "",
  defaultStartHour = "",
  defaultEndHour = "",
}: AddTaskProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(defaultDate);
  const [startHour, setStartHour] = useState<string>(defaultStartHour);
  const [endHour, setEndHour] = useState<string>(defaultEndHour);
  const [hasHour, setHasHour] = useState<boolean>(defaultHasHour);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const { user, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { tasks, updateTasks } = useTasks();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !date) {
      setErrorMessage("You must atleast fill a title and a date");
      return;
    }

    const taskDate = new Date(date);
    const newTask: TaskData = {
      name: title,
      description: description,
      date: taskDate,
      hasHour: hasHour,
      startHour: startHour,
      endHour: endHour,
      isRecurring: isRecurring,
    };
    setTitle("");
    setDescription("");
    setDate("");
    setHasHour(false);
    setStartHour("");
    setEndHour("");
    setIsRecurring(false);
    if (user) {
      const refresh = true;
      const token = await user.getIdToken(refresh);
      const response = await axios.post(`${API_URL}/tasks/add`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      updateTasks();
      onClose();
    }
  }
  // TODO: add validation to the form
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.addTask}>
        {!user ? (
          <div className={styles.errorUser}>
            <p>You need to be logged in to add task!</p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <form
            className={styles.addTaskForm}
            action=""
            onSubmit={handleSubmit}
          >
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="endHour">End Hour: </label>
                  <input
                    type="time"
                    id="endHour"
                    name="endHour"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/*
        <div>
          <label htmlFor="recurring">Recurring Task: </label>
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        </div>
        */}
            <div>
              <input type="submit" />
            </div>
            <div>
              <button onClick={onClose}>Close</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTask;
