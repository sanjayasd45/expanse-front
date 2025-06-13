import { useState } from "react";
import './SerchByTags.css'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getToday, spendingList } from "../../helper/helper.cac";
import { namelist } from "../../helper/listdata";
import { searchByTags } from "../../Apis/filter.api";
import Recent from "../recent/Recent";

export default function SerchByTags() {
    const user = useSelector((state) => state.user);
    const minimumDate = new Date(user.createdAt);
    let minDate = minimumDate.toISOString().split("T")[0];
    let maxDate = getToday()
      const [date, setDate] = useState({
        startDate: "",
        endDate: new Date(),
      });
    const [tag, setTag] = useState("")
    const [tagsData, setTagsData] = useState([])
    const tags = spendingList.concat(namelist)
    
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
    if(tag === "" || tag === "Select"){
        toast.error("Please select a valid tag", {
            theme : "colored"
        })
        return
    }
    const data = {
      ...date,
      tag,
      email: user.email,
    };
    console.log(data);
    const data1 = await searchByTags(data)
    setTagsData(data1)
    console.log("data1", data1); 
    
  }; 
  return (
    <div className="sbt">
        <div className="sbt-content">
          <div className="drp_search">
            <form onSubmit={handlesubmit}>
              <div className="drp-input">
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
              <div className="sbt_select">
                <div>
                  <label htmlFor="tag">Select Tag</label>
                  <select className="add_amount-opt" name='Tag' onChange={(e) => setTag(e.target.value)}>
                    {
                      tags?.map((ele) => (
                        <option key={ele}>{ele}</option>
                      ))
                    }
                  </select>
                </div>
                <button className="drp_search_btn" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="home_recents-items1">
            {tagsData?.map((item) => (
              <Recent key={item._id} item={item} delMdl={true} />
            ))}
          </div>
        </div>
    </div>
  )
}
