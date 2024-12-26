import { useState } from "react";
import "./AddAmount.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addAmount } from "../../Apis/amount";
import { addItem } from "../../Store/slices/getRecentData.slice";
import { toast } from "react-toastify";

// import { addTxn } from "../../Store/slices/getRecentData.slice";

export default function AddAmount({ setIsOpenAmt }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const email = user?.email;
  const [amt, setAmt] = useState("");
  const [opt, setOpt] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const handleSelect = (e) => {
    console.log(e.target.value);
    setOpt(e.target.value);
  };
  const handleChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value !== " ") {
      console.log(e.target.value / 1);
      setAmt(e.target.value);
    } else if (e.target.value / 1 === 0) {
      setAmt("");
    }
  };

  const formData = {
    email: user.email,
    amount: amt,
    Tag: opt,
    name: name,
    note: note,
    deduction: false,
  };
  const handleSubmit = async(e) => {
    if(formData.Tag === "" || formData.Tag === "Select"){
      toast.warn("Please Select a Tag", {
        theme : "colored"
      })
    }
    e.preventDefault();
    const data = await addAmount(formData);
    dispatch(addItem(data))
    setIsOpenAmt(false)
    setAmt("");
    setName("");
    setNote("");
  };
  return (
    <div className="add_amount">
      <form action="" className="add_amount-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Enter Amount</label>
          <input
            name="amount"
            placeholder="1000"
            value={amt}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="tag">Select Tag</label>
          <select className="add_amount-opt" onChange={handleSelect}>
            <option>Select</option>
            <option>Sallary</option>
            <option>Udhari vapas milna</option>
            <option>Creditor</option>
            <option>Client</option>
            <option>Investment</option>
          </select>
        </div>
        {opt === "Creditor" ||
        opt === "Client" ||
        opt === "Udhari vapas milna" ? (
          <div>
            <label htmlFor="name">Enter Name</label>
            <input
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        ) : null}
        <div>
          <label htmlFor="note">Enter Note</label>
          <input
            name="note"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></input>
        </div>
        <div className="add_amount-bnts">
          <button type="button" onClick={() => setIsOpenAmt(false)}>Cancel</button>
          <button type="submit">Add Amount</button>
        </div>
      </form>
    </div>
  );
}
AddAmount.propTypes = {
  setIsOpenAmt: PropTypes.func.isRequired,
};
