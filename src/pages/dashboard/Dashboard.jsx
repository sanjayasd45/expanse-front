import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { alltimeData } from '../../Apis/filter.api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Dashboard() {
  const user = useSelector(state => state.user);
  const [data, setData] = useState(null)

  const handleSelect = async(e) => {
    console.log(e.target.value);
    console.log(user.email);
    
    const data = await alltimeData(user)
    setData(data)
    console.log(data);
    
    
    
    //   if(e.target.value === "All Time"){
    //   }else if(e.target.value === "To Day"){

    //   }else if (e.target.value === "Last Week"){

    //   }else if(e.target.value === "Last Month"){

    //   }else if(e.target.value === "Last Year"){

    //   }
  };

  return (
    <div className='dashboard'>
      <Navbar />
      <div className='dashboard-c'>
        <button>Filter</button>
        <div className='dashboard-c-s'>
          <div className='dashboard-c-s-f'>
            <select onChange={handleSelect}>
              <option>All Time</option>
              <option>To Day</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
          </div>
          <div>Total Money Received <span>₹20000 <IoCheckmarkDoneCircleOutline /></span></div>
          {
            data?.data?.map((element) => <div key={element._id}>{element._id} <span>₹{element.sum} <IoCheckmarkDoneCircleOutline /></span></div>
            )
          }
          
          <div className='dashboard-c-s-b'>
            Balance <span>₹20000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
