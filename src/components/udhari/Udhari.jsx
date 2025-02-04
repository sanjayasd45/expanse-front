import { useState } from "react";
import "./Udhari.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { serachUdhari } from "../../Apis/filter.api";
import { getToday } from "../../helper/helper.cac";

export default function Udhari() {
  const user = useSelector((state) => state.user);
  const minimumDate = new Date(user.createdAt);
  let minDate = minimumDate.toISOString().split("T")[0];
  let maxDate = getToday()
  const [isChecked, setIsChecked] = useState(false);
  const [udhariData, setUdhariData] = useState(null);
  const [nameList, setNameList] = useState(null);

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
    const udhariData1 = await serachUdhari(data);
    let nameListData = [];
    udhariData1?.forEach((item) => {
      if (!nameListData.includes(item.name)) {
        nameListData.push(item.name);
      }
    });
    setNameList(nameListData);
    console.log(nameList);

    setUdhariData(udhariData1);
    // console.log(udhariData);
  };
  const udhariDataFinder = (name) => {
    return udhariData?.filter(document => document.name === name);
  }
  const udhariCalc = (name) => {
    let amount = 0
    const data = udhariData?.filter(document => document.name === name)
    data?.forEach((item) => {
      if(item.deduction){
        amount = amount - item.amount
      }else{
        amount = amount + item.amount
      }
    })
    return amount
  }
console.log(  typeof(udhariCalc("Ajad")));


  return (
    <div className="udhari">
      <h1>Udhari Summary</h1>
      <div className="udhari-content">
        <div className="drp_search">
          <form onSubmit={handlesubmit}>
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
                // yyyy-mm-dd
              />
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
        <div className="udhari-data">
          {nameList?.map((item) => (
            <details key={item?.index}>
              <summary>{item}</summary>
              <div>
                {
                  udhariDataFinder(item)?.map((ele) => 
                    <div className="udhari-data-items" key={ele?.index}>
                      <ul>
                        <li>{ele.Tag}</li>
                        <li>Note - {ele.note}</li>
                        <li>Name - {ele.name}</li>
                        <li>Name - ₹ {ele.amount}</li>
                        <li>Date - {(new Date(ele?.createdAt).toLocaleString()).split(",")[0]}</li>
                      </ul>
                    </div>
                  )
                }
                <p>Balance = <span style={{color : `${udhariCalc(item) > 0 ? "#FF1A00" : "#48FF00"}`}}> {udhariCalc(item)} ₹ </span></p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
