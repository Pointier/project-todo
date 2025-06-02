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
