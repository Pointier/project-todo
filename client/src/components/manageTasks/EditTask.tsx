import styles from "./EditTask.module.css";
import { Task } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import axios from "axios";
interface EditTaskProps {
  task: Task;
  onClose: () => void;
}
import { IoTrashBinOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const EditTask = ({ task, onClose }: EditTaskProps) => {
  const { user, loading } = useAuth();
  const { tasks, updateTasks } = useTasks();
  const [formData, setFormData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    date: task.date,
    startHour: task.startHour,
    endHour: task.endHour,
    hasHour: task.hasHour,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  async function editTask() {
    if (user) {
      const refresh = true;
      const token = await user.getIdToken(refresh);
      const response = await axios.post(`${API_URL}/tasks/edit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      updateTasks();
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editTask();
    onClose();
  };
  async function deleteTask() {
    if (user) {
      const refresh = true;
      const token = await user.getIdToken(refresh);
      const response = await axios.post(
        `${API_URL}/tasks/delete`,
        { id: task.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      updateTasks();
      onClose();
    }
  }
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <div className={styles.action}>
          <button onClick={deleteTask} className={styles.iconButton}>
            <IoTrashBinOutline />
          </button>
          <button onClick={onClose} className={styles.iconButton}>
            <IoCloseOutline />
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title: </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <input
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="hasHour">Hour: </label>
              <input
                type="checkbox"
                name="hasHour"
                checked={formData.hasHour}
                onChange={handleChange}
              />
              {formData.hasHour && (
                <div>
                  <div>
                    <label htmlFor="startHour">Start: </label>
                    <input
                      type="time"
                      name="startHour"
                      value={formData.startHour}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="endHour">End: </label>
                    <input
                      type="time"
                      name="endHour"
                      value={formData.endHour}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
