import { useEffect, useState } from "react";
import "./AddAmount.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addAmount } from "../../Apis/amount";
import { addItem } from "../../Store/slices/getRecentData.slice";
import { toast } from "react-toastify";
import { namelist } from "../../helper/listdata";
import { Loader } from "../../components/Sudo components/Loader";
import { formatName } from "../../helper/helper.cac";
import {  optNames } from "../../Apis/filter.api";

// import { addTxn } from "../../Store/slices/getRecentData.slice";

export default function AddAmount({ setIsOpenAmt }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [borrowNames0, setBorrowNames] = useState(null);
  const user = useSelector((state) => state.user);
  const [amt, setAmt] = useState("");
  const [opt, setOpt] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const handleSelect = (e) => {
    // console.log(e.target.value);
    setOpt(e.target.value);
  };
  const handleChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value !== " ") {
      // console.log(e.target.value / 1);
      setAmt(e.target.value);
    } else if (e.target.value / 1 === 0) {
      setAmt("");
    }
  };
  const nameCondition = (tag) => {
    return namelist.some((el) => el === tag);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setName(formatName(name))
    const formData = {
      email: user.email,
      amount: amt,
      Tag: opt,
      name: name,
      note: note,
      deduction: false,
    };

    if (formData.Tag === "" || formData.Tag === "Select") {
      toast.warn("Please Select a Tag", {
        theme: "colored",
      });
      setLoading(false);
    } else if (nameCondition(formData.Tag) && formData.name === "") {
      toast.warn("Please Enter Name", {
        theme: "colored",
      });
      setLoading(false);
    } else if (formData.note === "") {
      toast.warn("Please Enter Note", {
        theme: "colored",
      });
      setLoading(false);
    } else if (formData.amount === "") {
      toast.warn("Please Enter Amount", {
        theme: "colored",
      });
      setLoading(false);
    } else {
      try {
        const data = await addAmount(formData);
        // console.log(formData);
        dispatch(addItem(data));
        setIsOpenAmt(false);
        setAmt("");
        setName("");
        setNote("");
        setLoading(false);
        toast.success("Added Successfully!", {
          theme: "colored",
        });
      } catch (err) {
        toast.error(err.message, {
          theme: "colored",
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const foo = async () => {
      const borrowNames1 = await optNames({email : user.email, tag : "Lend"});
      setBorrowNames(borrowNames1);
    };
    foo();
  }, []);
  return (
    <div className="add_amount">
      <form action="" className="add_amount-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Enter Amount</label>
          <input
            name="amount"
            placeholder="₹"
            value={amt}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="tag">Select Tag</label>
          <select className="add_amount-opt" onChange={handleSelect}>
            <option>Select</option>
            <option>Sallary</option>
            <option>Repayment</option>
            <option>Borrow</option>
            <option>Creditor</option>
            <option>Client</option>
            <option>Investment</option>
          </select>
        </div>

        {opt === "Repayment" ? (
          <div>
            <label htmlFor="name">Select Name</label>
            <select id="name" name="name" className="opt_names" onChange={(e) => setName(e.target.value)}>
              <option value="select" >Select Name</option>
              {
                borrowNames0.map((ele) => (
                  <option value={ele} key={ele.index}>{ele}</option>
                ))
              }
            </select>
          </div>
        ) : null}

        {opt === "Creditor" || opt === "Client" || opt === "Borrow" ? (
          <div>
            <label htmlFor="name">Enter Name</label>
            <input
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(formatName(e.target.value))}
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
          <button type="button" onClick={() => setIsOpenAmt(false)}>
            Cancel
          </button>
          <button type="submit">Add Amount</button>
        </div>
      </form>
      {loading ? <Loader /> : ""}
    </div>
  );
}
AddAmount.propTypes = {
  setIsOpenAmt: PropTypes.func.isRequired,
};
