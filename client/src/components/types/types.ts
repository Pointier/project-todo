// Differentiate between this task and tasktype from context
export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  startHour: string;
  endHour: string;
  hasHour: boolean;
}

export interface Tasks {
  tasks: Task[];
  byDay: Map<string, Task[]>;
  byMonth: Map<string, Task[]>;
  byYear: Map<string, Task[]>;
}
