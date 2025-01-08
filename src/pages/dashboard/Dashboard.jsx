import Profile from "../../components/profile/Profile";
import Sidebar from "../../components/sidebar/sidebar";
import Filter from '../../components/filter/Filter'
import { IoMenu } from "react-icons/io5";


import './Dashboard.css'
import { useState } from "react";

export default function Dashboard() {
  const [menu, setMenu] = useState(false)

  return (
    <div className="dashboard">
      <div className={`${!menu ? "hide" : "ds_sidebar_menu"}`}
        onClick={() => setMenu(!menu)}
        >
        <IoMenu />
      </div>
      <div className={`${menu ? "hide" : "ds_sidebar"}`}>
        <Sidebar menu={menu} setMenu={setMenu} />
      </div>
      <div className="ds_main">
        {/* <Profile/> */}
        <Filter />
      </div>
    </div>
  );
}
