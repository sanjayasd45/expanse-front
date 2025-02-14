import './Sidebar.css'
import { ImProfile } from "react-icons/im";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineSummarize, MdSummarize } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';


export default function Sidebar({menu, setMenu, handleSidebarChange}) {

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
                <p onClick={handleSidebarChange}><ImProfile />Profile</p>
                <p onClick={handleSidebarChange}><MdOutlineDateRange/>Filter</p>
                <p onClick={handleSidebarChange}><MdOutlineSummarize/>Udhari Summary</p>
                <p onClick={handleSidebarChange}><MdSummarize />Summary</p>
            </div>
        </div>
    </div>
  )
}

Sidebar.propTypes = {
  menu: PropTypes.array.isRequired,
  setMenu: PropTypes.func.isRequired,
  handleSidebarChange: PropTypes.func.isRequired,
};