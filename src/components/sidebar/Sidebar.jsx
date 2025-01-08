import './Sidebar.css'
import { ImProfile } from "react-icons/im";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineSummarize, MdSummarize } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";


export default function Sidebar({menu, setMenu}) {



  return (
    <div className={`${menu ? "hide" : "sidebar"}`}>
        <div className='sidebar_btns'>
          <Link to={"/"}>Go TO Home</Link>
          <p onClick={() => setMenu(!menu)}>
            <IoMdClose />
          </p>
        </div>
        <div className="sidebar_content">
            <h2>Dashboard</h2>
            <div className='sidebar_opt'>
                <p><ImProfile />Profile</p>
                <p><MdOutlineDateRange/>Filter By Date</p>
                <p><FaFilter />Filter By Tags</p>
                <p><MdOutlineSummarize/>Udhari Summary</p>
                <p><MdSummarize />Summary</p>
            </div>
        </div>
    </div>
  )
}