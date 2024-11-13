import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { alltimeData, fromRange, today } from "../../Apis/filter.api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Dashboard() {
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
    }else if(e.target.value === "Last Month"){
      const data = await fromRange({ email, duration: 30 });
      setData(data);
      console.log(data);
    }else if(e.target.value === "Last Year"){
      const data = await fromRange({ email, duration: 365 });
      setData(data);
      console.log(data);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-c">
        <button>Filter</button>
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
          <div>
            Total Money Received{" "}
            <span>
              ₹{data?.totalSum} <IoCheckmarkDoneCircleOutline />
            </span>
          </div>
          {data?.data?.map((element) => (
            <div key={element._id}>
              {element._id}{" "}
              <span>
                ₹{element.sum} <IoCheckmarkDoneCircleOutline />
              </span>
            </div>
          ))}
          {data?.balance ? (
            <div className="dashboard-c-s-b">
              Balance <span>₹{data?.balance}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
