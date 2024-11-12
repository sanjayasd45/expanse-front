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
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function Home() {
  const email = useSelector((state) => state.user).email;
  const [plusAnim, setPlusAnim] = useState(false);
  const [visibility, setVisibility] = useState("visible");
  const [isOpenAmt, setIsOpenAmt] = useState(false);
  const [isSpending, setIsSpending] = useState(false);
  const topData = useTodaysTS();
  console.log(topData);

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
    window.open(`${baseUrl}/auth/google/callback`, "_self");
  }

  return (
    <div className="home">
      <Navbar />
      {email !== "" ? (
        <div className="home_recents">
          <div className="home_recents-total">
            <h3>
              {`Today's`} total spendings ₹{topData.totalAmount}
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
            <h3>{`Today's Spendings`}</h3>
            <div className="home_recents-items1">
              {recentDataList?.map((item) => (
                <Recent key={item._id} item={item} />
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
          <div className={`home_model1 ${isOpenAmt ? "visible" : "hide"}`}>
            <AddAmount isOpenAmt={isOpenAmt} setIsOpenAmt={setIsOpenAmt} />
          </div>
          <div className={`home_model2 ${isSpending ? "visible" : "hide"}`}>
            <AddSpendings
              isOpenAmt={isSpending}
              setIsSpending={setIsSpending}
            />
          </div>
        </div>
      ) : (
        <div className="home_user0">
          <h2>
            <span onClick={handleAuth}>Login</span> To See Data
          </h2>
        </div>
      )}
    </div>
  );
}
