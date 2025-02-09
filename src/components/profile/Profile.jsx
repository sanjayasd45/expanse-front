import './Profile.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import pic from "../../assets/img/p-pic.jpg";
import DateRangeSelecter from '../Sudo components/DateRangeSelecter';
import { toast } from 'react-toastify';
import PrintPdf from '../Sudo components/PrintPdf';
import { dateByRange } from '../../Apis/filter.api';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const createdDate = new Date(user?.createdAt);
  const options = { year: "numeric", month: "short" };
  const formattedDate = createdDate.toLocaleDateString("en-US", options);
  const [showForm, setShowForm] = useState(false);
  const [rangeData, setRangeData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Store the selected date range from child
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if(!selectedDate.startDate){
          toast.warn("Please Select From date !", {
          theme: "colored",
        });
      }
      const data = {...selectedDate,isChecked : true, email : user.email}
      console.log(data);
      const result = await dateByRange(data)
      setRangeData(result?.data)
      console.log(result);
      // setShowForm(false)
      toast.success("Downloading started", {
        theme : "colored"
      })
    }catch(e){
      toast.error(e.message, {
        theme : "colored"
      })
    }
  };

  return (
    <div className="profile">
      <div className='profileHeader'>
        <img src={pic} alt="" className="profileImg" />
        <div className="profileInfo">
          <h1 className="profileName">{user?.name}</h1>
          <p>{user?.email}</p>
          <p>Joined On {formattedDate}</p>
        </div>
      </div>
      <div className='profileOpts'>

        <div className={showForm ? "profileOpts-form-overlay" : "hide"} onClick={() => setShowForm(false)}></div>
        <form onSubmit={handleSubmit} className={showForm ? "" : "hide"}>
          <h2>Get Transactions</h2>
          <DateRangeSelecter onDateChange={handleDateChange} />
          <PrintPdf transactions={rangeData} />
          <button type="submit">Get</button>
        </form>
          <button onClick={() => setShowForm(true)} >Get Statement</button>
      </div>
    </div>
  );
}
