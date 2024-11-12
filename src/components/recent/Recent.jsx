import './Recent.css'
// import { IoCheckmarkDoneSharp } from "react-icons/io5";


export default function Recent({item}) {
  console.log(item);
  
  return (
    <div className='recents'>
        <p>{item.note}</p>
        <div className='recents-tags'>
            <p>₹{item.amount}</p>
            <p>{item.Tag}</p>
            {
              item?.name ? <p>{item.name}</p> : null  
            }
            {/* <p className={`${item.deduction ? "red" : "green"}`}><IoCheckmarkDoneSharp /></p> */}
        </div>
    </div>
  )
}
