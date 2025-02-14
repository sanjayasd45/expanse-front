import { useState } from "react";
import "./DateRangePicker.css";
import Recent from "../recent/Recent";
import { useSelector } from "react-redux";
import { dateByRange } from "../../Apis/filter.api";
import { toast } from "react-toastify";
import { getToday } from "../../helper/helper.cac";

const DateRangePicker = () => {
  const user = useSelector((state) => state.user);
  const minimumDate = new Date(user.createdAt);
  let minDate = minimumDate.toISOString().split("T")[0];
  let maxDate = getToday()

  const [isChecked, setIsChecked] = useState(false);
  const [rangeData, setRangeData] = useState(null);
  const [txnData, setTxnData] = useState(null);
  const [date, setDate] = useState({
    startDate: "",
    endDate: new Date(),
  });
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (date.startDate === "") {
      toast.error("From date is required", {
        theme: "colored",
      });
      return;
    }
    const data = {
      ...date,
      isChecked,
      email: user.email,
    };
    const rangeData = await dateByRange(data);
    if (rangeData[0]?.sum) {
      setRangeData(rangeData);
    } else {
      setTxnData(rangeData);
    }
  };

  return (
    <div className="date-range-picker">
      <div className="drp_main">
        <div className="drp_search">
          <form onSubmit={handlesubmit}>
            <div className="drp_serach_input">
              <div>
                <label htmlFor="start-date">From :</label>
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
                <label htmlFor="End Date">To :</label>
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
            <div className="drp_btn">
              <div>
                <span>Transactions</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="transaction"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  ></input>
                  <span className="slider round"></span>
                </label>
              </div>
              <button className="drp_search_btn" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        {isChecked ? (
          <div className="drp_txn">
            {txnData?.data?.map((item) => (
              <Recent key={item._id} item={item} delMdl={true} />
            ))}
          </div>
        ) : (
          <div className="range-data">
            {rangeData?.map((item) => (
              <div className="range-data-key" key={item.index}>
                <p key={item.index - 1}>{item._id}</p>
                <p
                  key={item.index - 2}
                  style={
                    item.deduction ? { color: "#ff6f6f" } : { color: "#4fe74f" }
                  }
                >
                  ₹ {item.sum}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
