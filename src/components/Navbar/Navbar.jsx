import "./Navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLoginCircleLine } from "react-icons/ri";
import { resetStore } from "../../Store/store";


export default function Navbar() {
  const navigate = useNavigate()
  const path = useLocation()
  const user = useSelector(state => state.user);
  console.log(user);
  const dispatch = useDispatch()

  const handleClick = () => {
    console.log("path", path.pathname);
    
    if(path.pathname === "/dashboard"){
      navigate("/")
    }else{
      navigate("/dashboard")
    }
  }
  
  

  function handleAuth() {

  }
  function logOut() {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    dispatch(resetStore());
  }
  return (
    <div className="navbar">
      <div>
        <NavLink to={"/dashboard"}>{user.picture ? <img src={user.picture}alt="profile pic" onClick={handleClick}></img> :  <FaRegCircleUser />}</NavLink>        
        <NavLink to={"/auth"}>
          {user.name != "" || undefined ? (
            <NavLink to={"/"}>
              <p onClick={logOut}><AiOutlineLogout /></p>
            </NavLink>
          ) : (
            <p onClick={handleAuth}>
              <RiLoginCircleLine />
            </p>
          )}
        </NavLink>
      </div>
    </div>
  );
}
