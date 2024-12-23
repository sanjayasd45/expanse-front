import './Recent.css'
import { MdDelete } from "react-icons/md";

// import { IoCheckmarkDoneSharp } from "react-icons/io5";


export default function Recent({item}) {
  console.log(item);
  let stl = " rgb(55 255 39 / 25%)"
  if(item?.deduction){
    stl = "rgb(251 55 0 / 25%)"
  }

  const deleteItem = async() => {

  }
  
  return (
    <div className='recents' style={{border : stl}}>
      <div className='recnts-data' style={{backgroundColor : stl}}>
        <div className='recents-tags'>
          <p>{item.note}</p>
          <div>
              <p >₹{item.amount} </p>
              <p>{item.Tag}</p>
              {
                item?.name ? <p>{item.name}</p> : null  
              }
               <p>{new Date(item?.createdAt).toLocaleString()}</p>
              {/* <p className={`${item.deduction ? "red" : "green"}`}><IoCheckmarkDoneSharp /></p> */}
          </div>
        </div>
        <div className='recents-delete'>
          <span ><MdDelete /></span>
        </div>
      </div>
    </div>
  )
}
