import Navbar from "../../components/Navbar/Navbar";
import Recent from "../../components/recent/Recent";

import "./Home.css";
import { useEffect, useState } from "react";
import AddAmount from "../../models/add amount/AddAmount";
import AddSpendings from "../../models/add spendings/AddSpendings";
import { useDispatch, useSelector } from "react-redux";
import { getRecentData } from "../../Store/slices/getRecentData.slice";
// import { useTodaysTS } from "../../helper/helper.cac";
import { useNavigate } from "react-router-dom";
import DeleteTxn from "../../models/delete/DeleteTxn";
import { IoOpenOutline } from "react-icons/io5";
import { FaAnglesLeft, FaAnglesRight  } from "react-icons/fa6";



export default function Home() {
  const navigate = useNavigate()
  const recentData = useSelector((state) => state.getRecentData.list);
  const email = useSelector((state) => state.user).email;
  const [isOpenAmt, setIsOpenAmt] = useState(false);
  const [isSpending, setIsSpending] = useState(false);
  const [txnToDelete, setTxnToDelete] = useState(null)
  const [delMdl, setDelMdl] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const dispatch = useDispatch();
  const onchangeLimit = (e) => {
    setLimit(e.target.value);
    if(page > e.target.value){
      setPage(e.target.value)
    }
  }

  const recentDataList= recentData?.data;
  // console.log("recentDataList", recentDataList);
  

  useEffect(() => {
    
    if (email !== "") {
      const cPage = Math.ceil(recentData?.totalDocs / limit);
      // console.log("resq", cPage);
      if (page > cPage) {
        setPage(cPage);
        dispatch(getRecentData({ email, page : cPage, limit }));
      }else{
        dispatch(getRecentData({ email, page, limit }));
      }
    }
  }, [email, page, limit]);

  function handleAuth() {
    navigate("/auth")
  }
  const txnToDeleted = (item) => {
    // console.log(item);
    setDelMdl(true)   
    // console.log(delMdl);
     
    setTxnToDelete(item)
  }

  return (
    <div className="home">
      <Navbar />
      {email !== "" ? (
        <div className="home_recents">
          <div className="home_recents-top">
            <div className="home_recents-top-limit">
              <label htmlFor="limit" >Limit</label>
              <select 
                className="add_amount-opt"
                name="limit"
                id="limit"
                value={limit}
                onChange={onchangeLimit}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={recentData?.totalDocs}>All</option>
              </select>
            </div>
            <div className="home_recents-top-page">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <FaAnglesLeft />
              </button>
              <span>{`${page} of ${recentData?.totalPages}`}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === recentData?.totalPages}
              >
                <FaAnglesRight />
              </button>
            </div>
          </div>
          <div className="home_recents-items">
            <h3>{`Transactions`}</h3>
            <div className="home_recents-items1" onClick={() => setShowBtn(false)}>
              {recentDataList?.map((item) => (
                <Recent key={item._id} item={item} txnToDeleted={txnToDeleted} />
              ))}
            </div>
          </div>
          <div className="home_addBtn">
            <div className={`${showBtn ? "hide" : "btn_show"}`} onClick={() => setShowBtn(true)}><IoOpenOutline /></div>
            <div className={`${showBtn ? "home_addBtn-item" : "hide"}`} onClick={() => setShowBtn(false)}>
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
