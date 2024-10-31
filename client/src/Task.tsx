interface Task {
  name: string;
  description: string;
  date: string;
}
interface TaskProps {
  task: Task
}
export default function TaskItem({ task }: TaskProps) {
  return (
    <>
      {task.name}
      {task.description}
      {task.date}
    </>
  )

}
