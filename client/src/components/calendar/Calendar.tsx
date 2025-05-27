import { useState } from "react";
import Month from "./submodule/Month";
import Day from "./submodule/Day";

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
  return (
    <div>
      Calendar: Affichage:
      <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
        {Object.values(Mode).map((m) => (
          <option value={m} key={m}>
            {m}
          </option>
        ))}
      </select>
      {modeComponentMap[mode]}
    </div>
  );
};

export default Calendar;

export { Mode };
