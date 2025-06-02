import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import type { User } from "firebase/auth";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Task } from "../types/types";
interface TasksContextType {
  tasks: TasksType | null;
  updateTasks: () => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksType {
  tasks: Task[];
  byDay: Map<string, Task[]>;
  byMonth: Map<string, Task[]>;
  byYear: Map<string, Task[]>;
}

async function getTasks(user: User | null): Promise<TasksType> {
  if (!user) {
    throw new Error("No user provided");
  }

  const refresh = true;
  const token = await user.getIdToken(refresh);

  const response = await axios.get(
    "http://localhost:3000/tasks/getAll",

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
  const [tasks, setTasks] = useState<TasksType | null>(null);
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
