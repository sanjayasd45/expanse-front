
import Sidebar from "../../components/sidebar/Sidebar";
import Filter from '../../components/filter/Filter'
import { IoMenu } from "react-icons/io5";
import './Dashboard.css'
import { useState } from "react";
import DateRangePicker from "../../components/filter by date/DateRangePicker";
import Udhari from "../../components/udhari/Udhari";
import SerchByTags from "../../components/serach by tags/SerchByTags";

export default function Dashboard() {
  
  const [menu, setMenu] = useState(false)
  const [side, setSide]  = useState("Summary")
  const handleSidebarChange  = (e) => {    
    if(typeof(e.target.textContent) === "string" && e.target.textContent !== ""){
      setSide(e.target.textContent)
    }
    if(window.innerWidth < "426"){
      setMenu(true)
    }
  }

  // Profile
  // Filter By Date
  // Filter By Tags
  // Udhari Summary
  // Summary
  return (
    <div className="dashboard">
      <div className={`${!menu ? "hide" : "ds_sidebar_menu"}`}
        onClick={() => setMenu(!menu)}
        >
        <IoMenu />
      </div>
      <div className={`${menu ? "hide" : "ds_sidebar"}`}>
        <Sidebar menu={menu} setMenu={setMenu} handleSidebarChange={handleSidebarChange} />
      </div>
      <div className="ds_main">
        {
          side === "Summary" ?  <Filter /> : (
            side === "Filter By Date" ? <DateRangePicker/> : (
              side === "Udhari Summary" ? <Udhari/> : (
                side === "Filter By Tags" ? <SerchByTags/> : <Filter/>
              )
            )
          )
        }
        
        {/* <Profile/> */}

        {/* <DateRangePicker onDateRangeChange={handleDateRangeChange} /> */}
      </div>
    </div>
  );
}
