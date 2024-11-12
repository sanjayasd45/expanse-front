import { ImCross } from 'react-icons/im';
import './AddSpendings.css'
import { useState } from 'react';
import PropTypes from 'prop-types'
import '../add amount/AddAmount.css'
import { AddSpending } from '../../Apis/spending';
import { useDispatch, useSelector } from "react-redux";
import { getRecentData } from '../../Store/slices/getRecentData.slice';

export default function AddSpendings({setIsSpending}) {
  const dispatch = useDispatch()
  const email = useSelector(state => state.user).email
  const [Tag , setTag] = useState("Sallary")
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
    const handleSubmit = (e) => {
      e.preventDefault()

      AddSpending({...data, email, Tag, deduction : true})
      setData({
        amount : "",
        name : "",
        note : ""
      })
      setTag("Sallary")
    }
    const handleCross = () => {
      setIsSpending(false)
      dispatch(getRecentData({ email }));
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
                <option>Education</option>
                <option>Room Rent</option>
                <option>Credit Card Bill</option>
                <option>Vegetables</option>
                <option>Petrol</option>
                <option>Wearables</option>
                <option>Beauty</option>
                <option>Fare</option>
                <option>Grocery</option>
                <option>Other</option>
              </select>
            </div>
            {Tag === "Creditor" || Tag === "Client" ? (
              <div>
                <label htmlFor="name">Enter Name</label>
                <input name="name" placeholder="Name" value={data.name} onChange={handleChange}></input>
              </div>
            ) : null}
            <div>
              <label htmlFor="note">Enter Note</label>
              <input name="note" placeholder="Note" value={data.note} onChange={handleChange}></input>
            </div>
            <button type="submit">Add Spending</button>
          </form>
          <div className="add_amount-crossIcon" onClick={handleCross}>
            <ImCross />
          </div>
        </div>
      );
}
AddSpendings.propTypes = {
  setIsSpending: PropTypes.func.isRequired
};