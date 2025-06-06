import styles from "./EditTask.module.css";
import { Task } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import axios from "axios";
interface EditTaskProps {
  task: Task;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;
const EditTask = ({ task, onClose }: EditTaskProps) => {
  const { user, loading } = useAuth();
  const { tasks, updateTasks } = useTasks();
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
      console.log(response.data);
      updateTasks();
      onClose();
    } else {
      console.error("No user logged in, cannot add task");
    }
  }
  return (
    <div className={styles.container}>
      <div>{task.title}</div>
      <button onClick={deleteTask}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditTask;
