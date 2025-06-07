import { useState } from "react";
import Month from "./submodule/Month";
import Day from "./submodule/Day";
import AddTask from "../manageTasks/AddTask";
import styles from "./Calendar.module.css";

interface CalendarProps {
  day: Date;
  setDay: (day: Date) => void;
}

enum Mode {
  Month = "Month",
  Day = "Day",
}

const Calendar = ({ day, setDay }: CalendarProps) => {
  const [mode, setMode] = useState<Mode>(Mode.Month);
  const modeComponentMap = {
    [Mode.Month]: <Month day={day} setDay={setDay} setMode={setMode}></Month>,
    [Mode.Day]: <Day day={day}></Day>,
  };
  // TODO: task does not appear directly, need to change back to main page
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        Display:
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          {Object.values(Mode).map((m) => (
            <option value={m} key={m}>
              {m}
            </option>
          ))}
        </select>
        <button onClick={() => setIsModalOpen(true)}>Add Task</button>
        {isModalOpen && (
          <div className={styles.modalBackdrop}>
            <AddTask onClose={() => setIsModalOpen(false)}></AddTask>
          </div>
        )}
      </div>
      <div className={styles.center}>{modeComponentMap[mode]}</div>
    </div>
  );
};

export default Calendar;

export { Mode };
