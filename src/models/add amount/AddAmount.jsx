import { useEffect, useState } from "react";
import "./AddAmount.css";
import PropTypes from 'prop-types';
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addAmount } from "../../Apis/amount";
import { getRecentData } from "../../Store/slices/getRecentData.slice";
// import { addTxn } from "../../Store/slices/getRecentData.slice";

export default function AddAmount({ setIsOpenAmt }) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const email = user?.email
  const [amt, setAmt] = useState("") 
  const [opt, setOpt] = useState("Sallary");
  const [name, setName] = useState("")
  const [note, setNote] = useState("General expense")
  const handleClick = () => {
    setIsOpenAmt(false);
    dispatch(getRecentData({ email }));
  };
  const handleSelect = (e) => {
    console.log(e.target.value);
    setOpt(e.target.value);
  };
  const handleChange = (e) => {
    if(!isNaN(e.target.value) && e.target.value !== ' '){
        console.log(e.target.value/1);
        setAmt(e.target.value)
    }else if(e.target.value/1 === 0){
        setAmt("")
    }
  }

  const formData = {
    email : user.email,
    amount : amt,
    Tag : opt,
    name : name,
    note : note,
    deduction : false
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addAmount(formData)
    setAmt("")
    setOpt("")
    setName("")
    setNote("")   
  }
  return (
    <div className="add_amount">
      <form action="" className="add_amount-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Enter Amount</label>
          <input name="amount" placeholder="1000" value={amt} onChange={handleChange} ></input>
        </div>
        <div>
          <label htmlFor="tag">Select Tag</label>
          <select className="add_amount-opt" onChange={handleSelect}>
            <option>Sallary</option>
            <option>Creditor</option>
            <option>Client</option>
            <option>Investment</option>
          </select>
        </div>
        {opt === "Creditor" || opt === "Client" ? (
          <div>
            <label htmlFor="name">Enter Name</label>
            <input name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
          </div>
        ) : null}
        <div>
          <label htmlFor="note">Enter Note</label>
          <input name="note" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)}></input>
        </div>
        <button type="submit">Add Amount</button>
      </form>
      <div className="add_amount-crossIcon" onClick={handleClick}>
        <ImCross />
      </div>
    </div>
  );
}
AddAmount.propTypes = {
  setIsOpenAmt: PropTypes.func.isRequired
};
