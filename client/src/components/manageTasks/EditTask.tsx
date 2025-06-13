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
      updateTasks();
      onClose();
    } else {
      console.error("No user logged in, cannot add task");
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
        <div></div>
      </div>
    </div>
  );
};

export default EditTask;
