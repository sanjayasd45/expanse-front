import "./AddSpendings.css";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../add amount/AddAmount.css";
import { AddSpending } from "../../Apis/spending";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Store/slices/getRecentData.slice";
import {
  evaluateExpression,
  setFileToServer,
  spendingList,
} from "../../helper/helper.cac";
import { toast } from "react-toastify";
import { namelist } from "../../helper/listdata";
import { Loader } from "../../components/Sudo components/Loader";
import { formatName } from "../../helper/helper.cac";
import { optNames } from "../../Apis/filter.api";
import { getCloudinaryPublicId } from "../../helper/helper.cac";

export default function AddSpendings({ setIsSpending }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [lendNames, setLendNames] = useState(null);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user).email;
  const [fileUrl, setFileUrl] = useState("");
  const [fileId, setFileId] = useState("");
  const [Tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    amount: "",
    note: "",
  });

  const handleChange = async (event) => {
    const regex = /^[0-9+*]+$/;
    const { name, value } = event.target;
    if (name === "file") {
      const file1 = event.target.files[0];
      setFile(file1);
    }
    setData((previous) => ({
      ...previous,
      [name]:
        name === "amount"
          ? regex.test(value)
            ? value
            : previous[name]
          : value,
    }));
    setData((previous) => ({
      ...previous,
      [name]:
        name === "amount" &&
        event.nativeEvent.inputType === "deleteContentBackward" &&
        value.length === 1
          ? regex.test(value)
            ? ""
            : previous[name]
          : value,
    }));
  };

  const nameCondition = (tag) => {
    return namelist.some((el) => el === tag);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form submission starts.
    console.log("data", data);

    try {
      // Validation checks
      if (data.amount === "") {
        toast.warn("Please Enter Amount", { theme: "colored" });
        setLoading(false); // Stop loading on validation failure
        return;
      }

      if (Tag === "" || Tag === "Select") {
        toast.warn("Please Select Tag", { theme: "colored" });
        setLoading(false);
        return;
      }

      if (nameCondition(Tag) && name === "") {
        toast.warn("Please Enter Name", { theme: "colored" });
        setLoading(false);
        return;
      }

      if (data.note === "") {
        toast.warn("Please Enter Note", { theme: "colored" });
        setLoading(false);
        return;
      }
      console.log("file", file);
      const fileUrl = await setFileToServer(file); // make sure this handles the upload correctly
      setFileUrl(fileUrl);
      const fileId = getCloudinaryPublicId(fileUrl); // parse the Cloudinary public ID
      setFileId(fileId);

      console.log("fileUrl", fileUrl);
      const amountf = evaluateExpression(data.amount);
      const dataToAdd = await AddSpending({
        name: name,
        note: data.note,
        amount: amountf,
        email,
        Tag,
        deduction: true,
        fileId,
      });
      console.log("dataToAdd ", dataToAdd);

      setData({
        amount: "",
        name: "",
        note: "",
      });
      const clearFile = () => {
        setFile(null);
        fileInputRef.current.value = ""; 
      };
      clearFile();
      dispatch(addItem(dataToAdd));
      toast.success("Added Successfully!", { theme: "colored" });
      setLoading(false);
    } catch (error) {
      // Handle any errors during the async operation
      console.error("Error adding spending:", error);
      toast.error("An error occurred. Please try again.", { theme: "colored" });
      setLoading(false); // Ensure loading state is turned off on error
    }
  };
  useEffect(() => {
    const data = { email: user.email, tag: "Borrow" };
    const foo = async () => {
      const lendNames1 = await optNames(data);
      setLendNames(lendNames1);
      console.log("lendNames1", lendNames1);
    };
    console.log(data);
    foo();
  }, []);
  const handleNameChange = (e) => {
    setName(formatName(e.target.value));
  };
  const handleCancel = () => {
    setIsSpending(false);
    setData({
      amount: "",
      name: "",
      note: "",
    });
    setName("");
    const clearFile = () => {
      setFile(null);
      fileInputRef.current.value = ""; // only allowed way to clear input
    };
    clearFile();
  };
  return (
    <div className="add_amount">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        ""
      )}

      <form action="" className="add_amount-form" onSubmit={handleSubmit}>
        <div className="add_amount-amount">
          <div>
            <label htmlFor="amount">Enter Amount</label>
            <input
              name="amount"
              placeholder="₹"
              value={data.amount}
              onChange={handleChange}
            ></input>
          </div>
          <p>{evaluateExpression(data.amount)}</p>
        </div>
        <div>
          <label htmlFor="tag">Select Tag</label>
          <select
            className="add_amount-opt"
            name="Tag"
            onChange={(e) => setTag(e.target.value)}
          >
            {spendingList?.map((ele) => (
              <option key={ele}>{ele}</option>
            ))}
          </select>
        </div>

        {Tag === "Repay Loan" ? (
          <div>
            <label htmlFor="name">Select Name</label>
            <select
              id="name"
              name="name"
              className="opt_names"
              onChange={handleNameChange}
            >
              <option value="select">Select Name</option>
              {lendNames?.map((ele) => (
                <option value={ele} key={ele?.index}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {Tag === "Borrow" || Tag === "Lend" || Tag === "Gratitude Pay" ? (
          <div>
            <label htmlFor="name">Enter Name</label>
            <input
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
        ) : null}
        <div>
          <label htmlFor="note">Enter Note</label>
          <input
            name="note"
            placeholder="Note"
            value={data.note}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="file">Image URL</label>
          <input
            name="file"
            type="file"
            placeholder="Select File"
            onChange={handleChange}
            accept="image/*"
            ref={fileInputRef}
            // value={file?.file[0]?.name}
          ></input>
        </div>
        <div className="spending-btns">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Add Spending</button>
        </div>
      </form>
    </div>
  );
}
AddSpendings.propTypes = {
  setIsSpending: PropTypes.func.isRequired,
};
