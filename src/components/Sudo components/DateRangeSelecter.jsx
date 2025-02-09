import { useState } from "react";
import { getToday } from "../../helper/helper.cac";
import { useSelector } from "react-redux";

export default function DateRangeSelecter({ onDateChange }) {
  const user = useSelector((state) => state.user);
  const minimumDate = new Date(user.createdAt);
  let minDate = minimumDate.toISOString().split("T")[0];
  let maxDate = getToday();

  const [date, setDate] = useState({
    startDate: "",
    endDate: new Date().toISOString().split("T")[0], // Ensure format
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = {
      ...date,
      [name]: value,
    };
    setDate(updatedDate);
    onDateChange(updatedDate);
  };

  return (
    <div className="drp_serach_input">
      <div>
        <label htmlFor="start-date">From : </label>
        <input
          name="startDate"
          id="start-date"
          placeholder="dd/mm/yyyy"
          onChange={handleDateChange}
          type="date"
          value={date.startDate}
          min={minDate}
          max={maxDate}
        />
      </div>
      <div>
        <label htmlFor="end-date">To : </label>
        <input
          name="endDate"
          id="end-date"
          value={date.endDate}
          placeholder="dd/mm/yyyy"
          onChange={handleDateChange}
          type="date"
          min={minDate}
          max={maxDate}
        />
      </div>
    </div>
  );
}
