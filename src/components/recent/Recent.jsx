import './Recent.css'
// import { IoCheckmarkDoneSharp } from "react-icons/io5";


export default function Recent({item}) {
  console.log(item);
  let stl = "2px solid rgb(55 255 39 / 76%)"
  if(item?.deduction){
    stl = "2px solid #fb37009c"
  }
  
  return (
    <div className='recents' style={{border : stl}}>
        <p>{item.note}</p>
        <div className='recents-tags'>
            <p style={{border : stl}}>₹{item.amount} </p>
            <p>{item.Tag}</p>
            {
              item?.name ? <p>{item.name}</p> : null  
            }
             <p>{new Date(item?.createdAt).toLocaleString()}</p>
            {/* <p className={`${item.deduction ? "red" : "green"}`}><IoCheckmarkDoneSharp /></p> */}
        </div>
    </div>
  )
}
