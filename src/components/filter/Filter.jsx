import "./Filter.css";
import { alltimeData, fromRange, today } from "../../Apis/filter.api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spendingList } from "../../helper/helper.cac";
import { Loader } from "../Sudo components/Loader";
import DateRangePicker from "../filter by date/DateRangePicker";
import SerchByTags from "../serach by tags/SerchByTags";
import Udhari from "../udhari/Udhari" 
// import HandlePrint from "../handlePrint/HandlePrint";

export default function Dashboard() {
  const [loading, setLoading] = useState()
  const [option, setOption] = useState(null)
  const user = useSelector((state) => state.user);
  const email = user.email;
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const data = await alltimeData(user);
      setData(data);
      setLoading(false)
    };
    user.email ? getData() : null;
  }, [user]);

  const handleSelect = async (e) => {
    if (e.target.value === "All Time") {
      setOption(e.target.value)
      const data = await alltimeData(user);
      setData(data);
      // console.log(data);
    } else if (e.target.value === "To Day") {
      setOption(e.target.value)
      const data = await today(user);
      setData(data);
      // console.log(data);
    } else if (e.target.value === "Last Week") {
      setOption(e.target.value)
      const data = await fromRange({ email, duration: 7 });
      setData(data);
      // console.log(data);
    } else if (e.target.value === "Last Month") {
      setOption(e.target.value)
      const data = await fromRange({ email, duration: 30 });
      setData(data);
      // console.log(data);
    } else if (e.target.value === "Last Year") {
      setOption(e.target.value)
      const data = await fromRange({ email, duration: 365 });
      setData(data);
      // console.log(data);
    } else if(e.target.value === "By Date"){
      setOption("By Date")
    } else if(e.target.value === "By Date & Tag"){
      setOption("By Date & Tag")
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-c">
        {/* <HandlePrint/> */}
        <div className="dashboard_btns">
          <h1>Filter By Range</h1>
          {/* <button>Add remote users</button> */}
        </div>
          <div>
            {
              loading ? <Loader/> : ""
            }
          </div>
        <div className="dashboard-c-s">
          <div className="dashboard-c-s-f">
            <select onChange={handleSelect}>
              <option>All Time</option>
              <option>To Day</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Year</option>
              <option>By Date</option>
              <option>By Date & Tag</option>
            </select>
          </div>
          {
            option === "By Date" ||
            option === "By Date & Tag" ||
            option === "By Tag" ? (
              option === "By Date" ? (
                  <DateRangePicker/>
              ) : (
                option === "By Date & Tag" ? (
                  <SerchByTags/>
                ) : <Udhari/>
              )
            ) : (
              <>
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
              {
                data ? "" : <h2 className="nothing">Nothing To Show</h2>
              }
          </>
            )
          }
        </div>
      </div>
    </div>
  );
}
