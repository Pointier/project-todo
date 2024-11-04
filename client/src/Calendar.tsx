import { format } from "date-fns";

const Calendar = () => {
  const current = format(new Date(), 'EEEE MMMM yyyy')

  return (
    <div>
      Calendar:
      <div>
        {current}
      </div>
    </div>
  )
}

export default Calendar
