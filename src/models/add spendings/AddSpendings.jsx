import './AddSpendings.css'
import { useState } from 'react';
import PropTypes from 'prop-types'
import '../add amount/AddAmount.css'
import { AddSpending } from '../../Apis/spending';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from '../../Store/slices/getRecentData.slice';
import { spendingList } from '../../helper/helper.cac';
import { toast } from 'react-toastify';
import { namelist } from '../../helper/listdata';

export default function AddSpendings({setIsSpending}) {
  const dispatch = useDispatch()
  const email = useSelector(state => state.user).email
  const [Tag , setTag] = useState("")
    const [data, setData] = useState({
      amount : "",
      name : "",
      note : "" 
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setData((previous)=> ({
            ...previous,
            [name]: name === "amount" ? (isNaN(Number(value)) ? previous[name] : Number(value)) : value
        }))
    }
    const nameCondition = (tag) => {
      return namelist.some((el) => el === tag);
    };

    const handleSubmit = async(e) => {
      e.preventDefault()
      if(data.amount === ""){
        toast.warn("Please Enter Amount", {
          theme : "colored"
        })
      }else if(Tag === "" || Tag === "Select"){
        toast.warn("Please Select Tag", {
          theme : "colored"
        })
      }else if( nameCondition(Tag) && data.name === ""){
        toast.warn("Please Enter Name", {
          theme : "colored"
        })
      }else if(data.note === ""){
        toast.warn("Please Enter Note", {
          theme : "colored"
        })
      }else{
        const dataToAdd = await AddSpending({...data, email, Tag, deduction : true})
        console.log({...data, email, Tag, deduction : true});
        setIsSpending(false)
        
        setData({
          amount : "",
          name : "",
          note : ""
        })
        dispatch(addItem(dataToAdd))
      }
    }
    
    return (
        <div className="add_amount"> 
          <form action="" className="add_amount-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="amount">Enter Amount</label>
              <input name="amount" placeholder="1000" value={data.amount} onChange={handleChange} ></input>
            </div>
            <div>
              <label htmlFor="tag">Select Tag</label>
              <select className="add_amount-opt" name='Tag' onChange={(e) => setTag(e.target.value)}>
                {
                  spendingList?.map((ele) => (
                    <option key={ele}>{ele}</option>
                  ))
                }
              </select>
            </div>
            {Tag === "Udhari Lena" || Tag === "Udhari Dena" || Tag ===  "Gratitude Pay"? (
              <div>
                <label htmlFor="name">Enter Name</label>
                <input name="name" placeholder="Name" value={data.name} onChange={handleChange}></input>
              </div>
            ) : null}
            <div>
              <label htmlFor="note">Enter Note</label>
              <input name="note" placeholder="Note" value={data.note} onChange={handleChange}></input>
            </div>
            <div className='spending-btns'>
              <button type='button' onClick={() => setIsSpending(false)}>Cancel</button>
              <button type="submit" >Add Spending</button>
            </div>
          </form>
        </div>
      );
}
AddSpendings.propTypes = {
  setIsSpending: PropTypes.func.isRequired
};