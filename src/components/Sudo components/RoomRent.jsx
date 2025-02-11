import { useState } from "react";
import PropTypes from "prop-types";
import { updateRoomRentInfo } from "../../Apis/user.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function RoomRent({showRent, setShowRent}) {    
    const user = useSelector((state) => state.user);
    // rend and electricity rate data
    const [rent, setRent] = useState({});
    const handleChange = (e) => {
        setRent({ ...rent, [e.target.name]: e.target.value });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!rent.room_rent || !rent.electricity_rate){
            toast.info("Please fill all the fields", {theme : "colored"});
            return;
        }
        try{
            const response = await updateRoomRentInfo({email : user?.email, ...rent});     
            toast.success(response?.message, {theme : "colored"});
            setShowRent(false);
            if(!response)
                throw new Error("Failed to set room rent");}
        catch(e){
            toast.error(e.message, {theme : "colored"});
        }

    }
  return (
    <>
    <div className={showRent ? "profileOpts-form-overlay" : "hide"} onClick={() => setShowRent(false)}></div>
    <div className="roomRent">
        <form onSubmit={handleSubmit} >
            <h2>Set Logic For Room Rent</h2>
            <div>
                <label htmlFor="room_rent">Set room rent</label>
                <input type="number" id="room_rent" name="room_rent"  onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="electricity_rate">Set electricity rate per unit</label>
                <input type="number" id="electricity_rate" name="electricity_rate"  onChange={handleChange} />
            </div>
            <button type="submit">Set</button>
        </form>
    </div>
    </>
  )
}
RoomRent.propTypes = {
    showRent: PropTypes.bool.isRequired,  // Must be a boolean
    setShowRent: PropTypes.func.isRequired,  // Must be a function
  };
