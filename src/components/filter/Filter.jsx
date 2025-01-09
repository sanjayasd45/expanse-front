import "./Filter.css";
import { alltimeData, fromRange, today } from "../../Apis/filter.api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spendingList } from "../../helper/helper.cac";

export default function Dashboard() {
  const value = JSON.parse(localStorage.getItem("userData"));
  console.log("value", value);

  const user = useSelector((state) => state.user);
  const email = user.email;
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await alltimeData(user);
      setData(data);
    };
    console.log("user", user);

    user.email ? getData() : null;
  }, [user]);

  const handleSelect = async (e) => {
    if (e.target.value === "All Time") {
      const data = await alltimeData(user);
      setData(data);
      console.log(data);
    } else if (e.target.value === "To Day") {
      const data = await today(user);
      setData(data);
      console.log(data);
    } else if (e.target.value === "Last Week") {
      const data = await fromRange({ email, duration: 7 });
      setData(data);
      console.log(data);
    } else if (e.target.value === "Last Month") {
      const data = await fromRange({ email, duration: 30 });
      setData(data);
      console.log(data);
    } else if (e.target.value === "Last Year") {
      const data = await fromRange({ email, duration: 365 });
      setData(data);
      console.log(data);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-c">
        <div className="dashboard_btns">
          <p>Filter By Range</p>
          {/* <button>Add remote users</button> */}
        </div>
        <div className="dashboard-c-s">
          <div className="dashboard-c-s-f">
            <select onChange={handleSelect}>
              <option>All Time</option>
              <option>To Day</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="dashboard-c-s-t">
            Total Txn Amount<span>₹{data?.totalSum}</span>
          </div>
          {data?.data?.map((element) => (
            <div key={element._id} className="dashboard-tags">
              {element._id}{" "}
              {spendingList.includes(element?._id) ? (
                <span style={{ color: "#ff1a00" }}>₹{element.sum} </span>
              ) : (
                <span style={{ color: "rgb(72 255 0)" }}>₹{element.sum}</span>
              )}
            </div>
          ))}
          {data?.balance ? (
            <div className="dashboard-c-s-b">
              Balance <span>₹ {data?.balance}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
