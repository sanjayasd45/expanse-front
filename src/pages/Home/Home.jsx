import Navbar from "../../components/Navbar/Navbar";
import Recent from "../../components/recent/Recent";
import { FaPlus } from "react-icons/fa";

import "./Home.css";
import { useEffect, useState } from "react";
import AddAmount from "../../models/add amount/AddAmount";
import AddSpendings from "../../models/add spendings/AddSpendings";
import { useDispatch, useSelector } from "react-redux";
import { getRecentData } from "../../Store/slices/getRecentData.slice";
import { useTodaysTS } from "../../helper/helper.cac";
import { useNavigate } from "react-router-dom";
import DeleteTxn from "../../models/delete/DeleteTxn";

export default function Home() {
  const navigate = useNavigate()
  const email = useSelector((state) => state.user).email;
  const [plusAnim, setPlusAnim] = useState(false);
  const [visibility, setVisibility] = useState("visible");
  const [isOpenAmt, setIsOpenAmt] = useState(false);
  const [isSpending, setIsSpending] = useState(false);
  const [txnToDelete, setTxnToDelete] = useState(null)
  const [delMdl, setDelMdl] = useState(false)

  const topData = useTodaysTS();

  const handleClick = (e) => {
    console.log(e.target);
    setPlusAnim(!plusAnim);
    plusAnim ? setVisibility("visible") : setVisibility("visible");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (email !== "") {
      dispatch(getRecentData({ email }));
    }
  }, [email]);
  const recentData = useSelector((state) => state.getRecentData);
  const recentDataList = recentData?.list?.response;
  console.log(recentDataList);

  function handleAuth() {
    navigate("/auth")
  }
  const txnToDeleted = (item) => {
    console.log(item);
    setDelMdl(true)   
    console.log(delMdl);
     
    setTxnToDelete(item)
  }

  return (
    <div className="home">

      
      <Navbar />
      {email !== "" ? (
        <div className="home_recents">
          <div className="home_recents-total">
            <h3>
                  Total Transactions ₹{topData.totalAmount}
            </h3>
            {
              topData?.topCategory?.amount && topData?.topCategory?.amount > 0 ? (
                <>
                  <p>Top </p>
                  <p>
                    {topData?.topCategory?.Tag} ₹
                    {topData?.topCategory?.amount}
                  </p>
                </>
              ) : (
                <p></p>
              )
            }
          </div>
          <div className="home_recents-items">
            <h3>{`Transactions`}</h3>
            <div className="home_recents-items1">
              {recentDataList?.map((item) => (
                <Recent key={item._id} item={item} txnToDeleted={txnToDeleted} />
              ))}
            </div>
          </div>
          <div className="home_addBtn">
            <div
              className={
                plusAnim ? `home_addBtn-icon animate-plus` : `home_addBtn-icon`
              }
              onClick={handleClick}
            >
              <FaPlus />
            </div>
            <div
              className={
                plusAnim ? `home_addBtn-item animate-item` : `home_addBtn-item`
              }
              style={{ visibility: visibility }}
            >
              <p onClick={() => setIsOpenAmt(true)}>Add Amount</p>
              <p onClick={() => setIsSpending(true)}>Add Spendings</p>
            </div>
          </div>
          <div className={` ${isOpenAmt ? "model visible-block" : "model"}`}>
            <AddAmount isOpenAmt={isOpenAmt} setIsOpenAmt={setIsOpenAmt} />
            <div className="overlay" onClick={() => setIsOpenAmt(false)}></div>
          </div>
          <div className={`${isSpending ? "model visible-block" : "model"}`}>
            <AddSpendings
              isOpenAmt={isSpending}
              setIsSpending={setIsSpending}
            />
            <div className="overlay" onClick={() => setIsSpending(false)}></div>
          </div>
        </div>
      ) : (
        <div className="home_user0">
          <h2>
            <span onClick={handleAuth}>Login</span> To See Data
          </h2>
        </div>
      )}
      <div className={delMdl ?  "model visible-block" : "model"}>
        <DeleteTxn txnToDelete={txnToDelete} setDelMdl={setDelMdl} delMdl={delMdl}/>
        <div className="overlay" onClick={() => setDelMdl(false)}></div>
      </div>
    </div>
  );
}
