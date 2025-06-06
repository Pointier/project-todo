import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import type { User } from "firebase/auth";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Task, Tasks } from "../types/types";

interface TasksContextType {
  tasks: Tasks | null;
  updateTasks: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;
const TasksContext = createContext<TasksContextType | undefined>(undefined);

async function getTasks(user: User | null): Promise<Tasks> {
  if (!user) {
    throw new Error("No user provided");
  }

  const refresh = true;
  const token = await user.getIdToken(refresh);

  const response = await axios.get(
    `${API_URL}/tasks/getAll`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  const tasks: Array<Task> = response.data;

  const byDay = new Map<string, Task[]>();
  const byMonth = new Map<string, Task[]>();
  const byYear = new Map<string, Task[]>();

  for (const task of tasks) {
    const date = parseISO(task.date);
    const dayKey = format(date, "d/M/y");
    const monthKey = format(date, "M/y");
    const yearKey = format(date, "y");

    if (!byDay.has(dayKey)) byDay.set(dayKey, []);
    if (!byMonth.has(monthKey)) byMonth.set(monthKey, []);
    if (!byYear.has(yearKey)) byYear.set(yearKey, []);

    byDay.get(dayKey)!.push(task);
    byMonth.get(monthKey)!.push(task);
    byYear.get(yearKey)!.push(task);
  }
  return { tasks, byDay, byMonth, byYear };
}

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks | null>(null);
  const { user, loading } = useAuth();

  const updateTasks = async () => {
    if (user) {
      try {
        const fetched = await getTasks(user);
        setTasks(fetched);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      updateTasks();
    }
  }, [user]);

  return (
    <TasksContext.Provider value={{ tasks, updateTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
export { TasksProvider, useTasks };
